import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { getSpotifyToken } from '../../services/spotifyAPI'

export default class Home extends Component  {
  
  componentDidMount() {
    getSpotifyToken()
  }


  render() {
    return (
      <View styl={{ flex: 1 }}>
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
              
            </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '100%',
    width: '100%'
  },
  list: {
    width: '100%',
    height: 800
  },
  playlistDetails: {
    width: '100%',
    height: 510,
    position: 'absolute',
    top: 90,
    display: 'flex',
    alignItems: 'center'
  },
  playlistArt: {
    width: 180,
    height: 180,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 30,
    marginTop: 50
  },
  playlistSubtitle: {
    color: '#b9bdbe',
    fontSize: 12,
    marginTop: 15
  },
  playlistButton: {
    backgroundColor: '#2ab759',
    width: 230,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 40
  },
  playlistButtonText: {
    fontSize: 12,
    color: '#fff',
    letterSpacing: 2
  },
  playlistItem: {
    marginLeft: 25,
    marginBottom: 25
  },
  playlistItemTitle: {
    fontSize: 18,
    color: '#fff'
  },
  playlistItemMeta: {
    color: '#b9bdbe',
    fontSize: 15
  }
});