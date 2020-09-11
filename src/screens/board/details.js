import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements'

import { getArtist, getArtistAlbums } from '../../services/spotifyAPI'

export default class Details extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      artistId: props.route.params.id,
      artist: [],
      artistAlbums: []
    }
  }

  errorMessage = () => {
    return (
       Alert.alert(
            "Erreur",
            "Une erreur est survenu lors du chargement",
            [ { text: "OK", onPress: () => this.props.navigation.goBack() } ],
            { cancelable: false }
          )
    )
  } 
  
  componentDidMount() {
    const { artistId } = this.state

    AsyncStorage.getItem('token').then(res => {
      getArtist(res, artistId)
        .then(res => { this.setState({ artist: res})})
        .catch(res =>  this.errorMessage())

      getArtistAlbums(res, artistId)
        .then(res => this.setState({ artistAlbums: res.items}))
        .catch(res =>  this.errorMessage())
    })
  }


  render() {
    const { artist, artistAlbums, user_token } = this.state
    const { navigation } = this.props

    return (
        <View style={{flex: 1}}>
          <HeaderImageScrollView
            maxHeight={200}
            minHeight={100}
            renderHeader={() => <Image source={{ uri: artist.images && artist.images[0].url }} style={styles.image} />}
            ScrollViewComponent={FlatList}
            data={artistAlbums}
            keyExtractor={(item) => item.id}
            scrollViewBackgroundColor={"#121212"}
            renderItem={(albums) => {
              
              let date = new Date().getFullYear(albums.item.release_date)

              return (
                <TouchableOpacity style={styles.itemView} onPress={() => navigation.navigate('Tracks', { id: albums.item.id, image: albums.item.images[0].url })}>
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
                  <Icon onPress={() => navigation.goBack()} name="chevron-left" type="material-community" color="#FFFFFF" />
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