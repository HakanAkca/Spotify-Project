import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import 'moment/min/moment-with-locales'

import { AuthContext } from '../../services/AuthContext.js'
import { getSpotifyToken, getArtists, getAutorization, getUserTopArtists, getNews, featuredPlaylists } from '../../services/spotifyAPI'

import { List } from '../../components/Home/List'

export default function Home({ navigation }) {

  const { refreshToken } = useContext(AuthContext)

  const [loading, setLoading] = useState(true)
  const [topArtists, setTopArtists] = useState([]);
  const [newAlbums, setNewAlbums] = useState([])
  const [featuredPlaylist, setFeaturedPlaylist] = useState([])

  useEffect( () => {
    async function getTokenAndFetch() {
      await AsyncStorage.multiGet(['token', 'refresh_token']).then(async res => {
        const token = res[0][1]
        const date = await AsyncStorage.getItem('date')

        if (moment().locale('fr').diff(date, 'minutes') >= 45) {
              refreshToken(res[1][1])
              const new_token = await AsyncStorage.getItem('token')
              getUserTopArtists(new_token).then(res => setTopArtists(res))
              getNews(new_token).then(res => setNewAlbums(res.albums)).catch(() => alert('ok'))
              featuredPlaylists(new_token).then(res => setFeaturedPlaylist(res), setLoading(false)).catch(() => alert('ok'))
        } else {
          getUserTopArtists(token).then(res => setTopArtists(res))
          getNews(token).then(res => setNewAlbums(res.albums), setLoading(false)).catch(() => alert('ok'))
          featuredPlaylists(token).then(res => setFeaturedPlaylist(res), setLoading(false)).catch(() => alert('ok'))
        }
      }); 
    }
    getTokenAndFetch()
  },[]);

  console.log(featuredPlaylist.playlists.items)

  return (
      <View style={{ flex: 1 }}>
      {
        loading ?
          <LinearGradient colors={['#3f6b6b', '#121212']} style={{height: '100%', width: '100%'}}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LinearGradient>
        :
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <List navigation={navigation} data={topArtists.items} title="Vos artistes du moment" checkRouting={true}/>
            <List navigation={navigation} data={newAlbums.items} title="Les nouveautées" checkRouting={false} />
            <List navigation={navigation} data={featuredPlaylist.playlists.items} title={featuredPlaylist.message} checkRouting={false}/>
          </ScrollView>

        </LinearGradient>
          
      } 
      </View>
  );
}

const styles = {
  header: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
}
