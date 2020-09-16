import React from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/min/moment-with-locales'
moment.locale('fr-FR');
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import { getAutorization, me, getSpotifyToken, refreshToken } from './src/services/spotifyAPI'
import { AuthContext } from './src/services/AuthContext'


import Home from './src/screens/board/HomeScreen'
import DetailsScreen from './src/screens/board/DetailsScreen'
import TracksScreen from './src/screens/board/AlbumsTracksScreen'
import SearchScreen from './src/screens/board/SearchScreen'

import { SignIn } from './src/screens/auth/signIn'
import { Settings } from './src/screens/board/SettingsScreen'

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
            <HomeScreen.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Tracks" component={TracksScreen} options={{ headerShown: false }} />
        </HomeScreen.Navigator>
    )
}


const Search = createStackNavigator();
function SearchStackScreen() {
    return (
        <Search.Navigator>
            <Search.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <HomeScreen.Screen name="Tracks" component={TracksScreen} options={{ headerShown: false }} />
        </Search.Navigator>
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
                component={SearchStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"search"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
            <Tab.Screen 
                name="Paramètres" 
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

  useFonts({Inter_900Black});

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
        case 'REFRESH_TOKEN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      refresh_token: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      const date = await AsyncStorage.getItem('date');
      const token = await AsyncStorage.getItem('token')

      if (token === null & date === null) {
         dispatch({ type: 'SIGN_OUT', userToken: null });
      } else if (moment(new Date()).locale('fr').diff(date, 'minutes') > 30) {
          const date = await AsyncStorage.getItem('refresh_token').then(res => 
            refreshToken(res).then(res => {
              userToken = res.access_token
              AsyncStorage.multiSet([['token', res.access_token], ['date', moment(new Date()).locale('fr').toString()]]);
            }) 
          );
      } else {
        userToken = AsyncStorage.getItem('token')
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
         getAutorization().then(res => {
            if (res.type !== "success") { 
                console.log('nani')
            } else {
                getSpotifyToken(res.params.code).then(res => {
                    const token = res.access_token
                    const refresh_token = res.refresh_token
                    const date = moment(new Date).locale('fr').toString()

                    AsyncStorage.multiSet([['token', token], ['date', date], ['refresh_token', refresh_token]]);
                    dispatch({ type: 'SIGN_IN', token: token });
                })
            }
        })
      },
      signOut: () => { 
        AsyncStorage.multiRemove(['token', 'date', 'refresh_token'])
        dispatch({ type: 'SIGN_OUT' }) 
      },
      refreshToken: (res) => { 
        refreshToken(res).then(async res => {
          await AsyncStorage.setItem('token', res.access_token)
          })}
    }),[]);

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
