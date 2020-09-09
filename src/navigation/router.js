import React, { Component, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import { AuthContext } from '../services/AuthContext'
import { SignIn } from '../screen/auth/signIn'
import Home from '../screen/board/home'

// const DistrictScreen = createStackNavigator();

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
        </HomeScreen.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const TabsScreen = () => {
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
                component={HomeStackScreen} 
                options={{
                    tabBarIcon: ({ focused, color }) => {
                        return <Icon name={"book"} type={"material-comunity"} color={color} />;
                    }  
                }}
            />
        </Tab.Navigator>
    )
}


const isLoggedIn = false;
const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => {

    return (
        <RootStack.Navigator headerMode="none">
            {
                userToken ? (
                    <RootStack.Screen name="Board" component={TabsScreen} />
                ) : (
                    <RootStack.Screen name="Auth" component={AuthStack} />
                )
            }
        </RootStack.Navigator>
    )
}


export const Router = () => {

    const [userToken, setUserToken] = useState(null)

    const authContext = useMemo(() => {
        return {
            signIn: () => {
                setUserToken("test")
            },
            signOut: () => {
                setUserToken(nul)
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={authContext}> 
            <NavigationContainer>
                <RootStackScreen userToken={userToken} />
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
