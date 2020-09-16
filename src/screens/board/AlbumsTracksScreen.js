import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import TextTicker from 'react-native-text-ticker'


import { getAlbumsTracks } from '../../services/spotifyAPI'

export default class AlbumsTracks extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      album_id: props.route.params.id,
      track_image: props.route.params.image,
      loading: true,
      tracks: []
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
    const { album_id } = this.state

    AsyncStorage.getItem('token').then(res => {
      getAlbumsTracks(res, album_id)
        .then(res => this.setState({tracks: res.items, loading: false }))
        .catch(res =>  this.errorMessage())
    })
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {

    const { loading, tracks, track_image } = this.state
    const { navigation } = this.props

    if (loading) {
      return (
        <LinearGradient colors={['#3f6b6b', '#121212']} style={[styles.header, { justifyContent: 'center'}]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </LinearGradient>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <View style={{alignItems: 'flex-start', marginLeft: '5%', paddingTop: '5%'}}>
                <Icon onPress={() => navigation.goBack()} name="chevron-left" type="material-community" color="#FFFFFF" />
              </View>
              <View style={{marginTop: '5%', alignItems: 'center'}}>
                <Image style={{height: 140, width: 140 }} source={{ uri: track_image }} />
              </View>
              <View style={{flex: 1, padding: '5%'}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tracks}
                    keyExtractor={tracks => tracks.id}
                    renderItem={(tracks) => {  
                      return (
                        <View  style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                          <View style={{padding: 5, width: '90%'}}>
                            <TouchableOpacity onPress={() => navigation('Details', { id: tracks.item.id })}>
                              <Text style={{ marginTop: '1%', color: '#FFFFFF', fontSize: 16}}>{tracks.item.name.substring(0, 35)}</Text>
                              <Text style={{ marginTop: '1%', color: '#3f6b6b', fontSize: 10}}>{this.millisToMinutesAndSeconds(tracks.item.duration_ms)}</Text>
                            </TouchableOpacity>
                          </View>
                          <Icon name="dots-horizontal" type="material-community" color="#FFFFFF" />
                      </View>
                      )
                      }
                    }
                  />
              </View>
            </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
}

const styles = {
  header: {
    height: '100%',
    width: '100%'
  }
};