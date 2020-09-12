import React, { Component, useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements'
import moment from 'moment'

import { getSpotifyToken, getArtist, getArtistAlbums, getUserTopArtists } from '../services/spotifyAPI'
import { AuthContext } from '../services/AuthContext'

export default function DetailsList(data) {

  const { refreshToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [artist, setArtist] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    async function getTokenAndFetch() {
      await AsyncStorage.multiGet(['token', 'refresh_token']).then(async res => {
        const token = res[0][1]
        const date = await AsyncStorage.getItem('date')

        if (moment().locale('fr').diff(date, 'minutes') >= 45) {
              refreshToken(res[1][1])
              const new_token = await AsyncStorage.getItem('token')

              getArtist(new_token, data.id).then(res => { this.setState({ artist: res })}).catch(res =>  console.log('erreur'))
              getArtistAlbums(new_token, data.id).then(res => this.setState({ artistAlbums: res.items })).catch(res =>  console.log('erreur'))
        } else {
          getArtist(token, data.id).then(res => setArtist(res)).catch(() => console.log('erreur'))
          getArtistAlbums(token, data.id).then(res => setArtistAlbums({ artistAlbums: res.items })).catch(res => console.log('erreur'))
        }
      }); 
    }
    getTokenAndFetch()
    },[]);

    return (
        <View style={{flex: 1}}>
          <HeaderImageScrollView
            maxHeight={200}
            minHeight={100}
            renderHeader={() => <Image source={{ uri: artist.images && artist.images[0].url }} style={styles.image} />}
            ScrollViewComponent={FlatList}
            data={artistAlbums.artistAlbums}
            keyExtractor={(item) => item.id}
            scrollViewBackgroundColor={"#121212"}
            renderItem={(albums) => {

              let date = new Date().getFullYear(albums.item.release_date)

              return (
                <TouchableOpacity style={styles.itemView} onPress={() => data.navigation.navigate('Tracks', { id: albums.item.id, image: albums.item.images[0].url })}>
                  <Image style={styles.itemImage} source={{ uri: albums.item.images[0].url }} />
                  <View style={{flexShrink: 1, marginLeft: '3%'}}>
                    <Text style={styles.itemText}>{albums.item.name}</Text>
                    <Text style={[styles.itemText, { marginTop: '5%' }]}>{date} - {albums.item.type}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            renderForeground={() => ( 
              <View style={styles.titleContainer}>
                <View style={{marginTop: '5%'}}>
                  <Icon onPress={() => data.navigation.goBack()} name="chevron-left" type="material-community" color="#FFFFFF" />
                </View>
                <View style={{marginBottom: '5%'}}>
                  <Text style={styles.imageTitle}>{artist.name}</Text>
                </View>
              </View>
            )}
          />
        </View>
    );
}

const styles = {
  image: {
    height: 250,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 30,
  },
  titleContainer: {
    flex: 1,
    left: '5%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemView: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection:'row',
    padding: 10
  },
  itemImage: {
    height: 80,
    width: 80
  },
  itemText: {
    marginTop: '1%', 
    color: '#FFFFFF'
  }
};