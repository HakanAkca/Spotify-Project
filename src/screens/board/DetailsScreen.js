import React, { Component, useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements'
import moment from 'moment'
import 'moment/min/moment-with-locales'
moment.locale('fr-FR');

import { getSpotifyToken, getArtist, getArtistAlbums, getUserTopArtists } from '../../services/spotifyAPI'
import { AuthContext } from '../../services/AuthContext'

export default function DetailsList(props) {  

  const { refreshToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ artist: null, artistsAlbum: null });

  useEffect(() => {
    async function getTokenAndFetch() {
      await AsyncStorage.multiGet(['token', 'refresh_token']).then(async res => {
        const token = res[0][1]
        const date = await AsyncStorage.getItem('date')

        if (moment().locale('fr').diff(date, 'minutes') > 30) {
              refreshToken(res[1][1])
              const new_token = await AsyncStorage.getItem('token')
              const artist = await getArtist(new_token, props.route.params.id)
              const artist_albums = await getArtistAlbums(new_token, props.route.params.id)

              setData({ artist: artist, artistsAlbum: artist_albums.items });
              setLoading(false)
        } else {
            const artist = await getArtist(token, props.route.params.id)
            const artist_albums = await getArtistAlbums(token, props.route.params.id)

            setData({ artist: artist, artistsAlbum: artist_albums.items });
            setLoading(false)
        }
      }); 
    }
    getTokenAndFetch()
    },[]);

    if (loading) {
      return (
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </LinearGradient>
      )
    }

    return (
        <View style={{flex: 1}}>
          <HeaderImageScrollView
            maxHeight={200}
            minHeight={100}
            renderHeader={() => <Image source={{ uri: data.artist.images &&  data.artist.images[0].url }} style={styles.image} />}
            ScrollViewComponent={FlatList}
            data={data.artistsAlbum}
            keyExtractor={(item) => item.id}
            scrollViewBackgroundColor={"#121212"}
            renderItem={(albums) => {
              
              let date = new Date().getFullYear(albums.item.release_date)

              return (
                <TouchableOpacity style={styles.itemView} onPress={() => props.navigation.navigate('Tracks', { id: albums.item.id, image: albums.item.images[0].url })}>
                  <Image style={styles.itemImage} source={{ uri: albums.item.images[0].url }} />
                  <View style={{flexShrink: 1, marginLeft: '3%'}}>
                    <Text style={styles.itemText}>{albums.item && albums.item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.itemText, { marginTop: '5%', fontSize: 12 }]}>{date} </Text>
                      <Text style={[styles.itemText, { marginTop: '5%', fontSize: 12 }]}>- {albums.item && albums.item.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
            renderForeground={() => ( 
              <View style={styles.titleContainer}>
                <View style={{marginTop: '10%'}}>
                  <Icon onPress={() => props.navigation.goBack()} name="chevron-left" type="material-community" color="#FFFFFF" />
                </View>
                <View style={{marginBottom: '5%'}}>
                  <Text style={styles.imageTitle}>{data.artist.name}</Text>
                </View>
              </View>
            )}
          />
        </View>
    );
}

const styles = {
  header: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
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
    color: '#FFFFFF',
    fontFamily: 'Inter_900Black'
  }
};