import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import 'moment/min/moment-with-locales'
moment.locale('fr-FR');

import { AuthContext } from '../../services/AuthContext.js'
import { getSpotifyToken, getArtists, getAutorization, getUserTopArtists, getNews, featuredPlaylists } from '../../services/spotifyAPI'

import { List } from '../../components/Home/List'

export default function Home({ navigation }) {

  const { refreshToken, signOut } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ artists: null, albums: null });

  useEffect( () => {
    async function getTopArtists() {
      await AsyncStorage.multiGet(['token', 'refresh_token']).then(async res => {
        const token = res[0][1]
        const date = await AsyncStorage.getItem('date')

        if (moment().locale('fr').diff(date, 'minutes') > 30) {
              refreshToken(res[1][1])
              const new_token = await AsyncStorage.getItem('token')
              const topArtists = await getUserTopArtists(new_token)
              const newAlbums = await getNews(new_token)

              setData({ artists: topArtists, albums: newAlbums.albums });
              setLoading(false)
        } else {
            const topArtists = await getUserTopArtists(token)
            const newAlbums = await getNews(token)
            
            setData({ artists: topArtists, albums: newAlbums.albums });
            setLoading(false)
        }
      }); 
    }

    getTopArtists()
  },[]);

  return (
      <View style={{ flex: 1 }}>
      {
        loading ?
          <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LinearGradient>
        :
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <List navigation={navigation} data={data.artists && data.artists.items} title="Vos artistes du moment" checkRouting={true} />
            <List navigation={navigation} data={data.albums && data.albums.items} title="Les nouveautées" checkRouting={false} />
          </ScrollView>
        </LinearGradient>
      } 
      </View>
  );
}

const styles = {
  header: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems:'center',
    justifyContent: 'center'
  }
}
