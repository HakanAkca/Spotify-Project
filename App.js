import React from 'react';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/min/moment-with-locales'

import { AuthContext } from './src/services/AuthContext'
import { SignIn } from './src/screens/auth/signIn'
import { Settings } from './src/screens/board/settings'
import { getAutorization, me, getSpotifyToken } from './src/services/spotifyAPI'

import Home from './src/screens/board/home'
import Details from './src/screens/board/details'
import Tracks from './src/screens/board/albumsTracks'

const AuthScreen = createStackNavigator();
function AuthStack() {

    return (
        <AuthScreen.Navigator>
            <AuthScreen.Screen name="Login" component={SignIn} options={{ headerShown: false }} />
        </AuthScreen.Navigator>
    );
}


const HomeScreen = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeScreen.Navigator>
            <HomeScreen.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Details" component={Details} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Tracks" component={Tracks} options={{ headerShown: false }} />
        </HomeScreen.Navigator>
    )
}

const SettingsScreen = createStackNavigator();
function SettingsStackScreen() {
    return (
        <SettingsScreen.Navigator>
            <SettingsScreen.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </SettingsScreen.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function TabsScreen() {
    return (
        <Tab.Navigator 
            tabBarOptions={{
                style:{
                    backgroundColor: '#121212'
                },
                activeTintColor: '#FFFFFF',
                tabBarIcon: {
                    
                }
            }}
        >
            <Tab.Screen 
                name="Accueil" 
                component={HomeStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"home"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
            <Tab.Screen 
                name="Recherche" 
                component={HomeStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"search"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
            <Tab.Screen 
                name="Bibliothèque" 
                component={SettingsStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"book"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
        </Tab.Navigator>
    )
}


export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
         getAutorization().then(res => {
            if (res.type !== "success") { 
                console.log('nani')
            } else {
                getSpotifyToken(res.params.code).then(res => {
                    console.log(res)
                    const token = res.access_token
                    const refresh_token = res.refresh_token
                    const date = moment(new Date()).locale('fr').toString()

                    AsyncStorage.multiSet([['token', token], ['date', date], ['refresh_token', refresh_token]]);
                    dispatch({ type: 'SIGN_IN', token: token });
                })
            }
        })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  const Stack = createStackNavigator()

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {
            state.userToken == null ? (
              <Stack.Screen name="Auth" component={SignIn} />
            ) : (
              <Stack.Screen name="Board" component={TabsScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
