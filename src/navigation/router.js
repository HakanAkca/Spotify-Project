import React, { Component, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/min/moment-with-locales'

import { AuthContext } from '../services/AuthContext'
import { SignIn } from '../screens/auth/signIn'
import { Settings } from '../screens/board/settings'
import { getAutorization, me, getSpotifyToken } from '../services/spotifyAPI'

import Home from '../screens/board/home'
import Details from '../screens/board/details'
import Tracks from '../screens/board/albumsTracks'

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


const isLoggedIn = false;
const RootStack = createStackNavigator();

const RootStackScreen = ({userToken}) => {

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


export default class Router extends Component {
    
    constructor() {
        super()
        this.state = {
            user_token: ''
        }
    }

    const authContext = useMemo(() => {
        return {
            signIn: () => {
                getAutorization().then(res => {
                    if (res.type !== "success") { 
                        console.log('nani')
                    } else {
                        getSpotifyToken(res.params.code).then(res => {
                            const token = res.access_token
                            const date = moment(new Date()).locale('fr').toString()

                            setUserToken(res.access_token)
                            AsyncStorage.multiSet([['token', token], ['date', date]]);
                        })
                    }
                })
            },
            signOut: () => {
                setUserToken(null)
                AsyncStorage.removeItem('token')
            }
        }
    }, [])
    render() {
    return (
        <AuthContext.Provider value={authContext}> 
            <NavigationContainer>
                <RootStackScreen userToken={userToken} />
            </NavigationContainer>
        </AuthContext.Provider>
    );
    }
}
