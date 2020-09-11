import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import 'moment/min/moment-with-locales'

import { getSpotifyToken, getArtists, getAutorization, getUserTopArtists, me, getRecommanded } from '../../services/spotifyAPI'
import { List } from '../../component/list'

// export default class Home extends Component  {

//   constructor(props) {
//     super(props)
//     this.state = {
//       user: '',
//       topArtists: [],
//       recommanded: [],
//       loading: true
//     }
//   }
  
//   componentDidMount() {
//       AsyncStorage.multiGet(['token', 'date']).then(res => {
//         console.log(res)
//         if (moment().locale('fr').diff(res[1][1], 'minutes') > 1) {
//           console.log('ok')
//         } else {
//           this.getMultipleData(res[0][1])
//         }
//       })
//   }

//   getMultipleData(token) {
//     me(token).then(res => this.setState({user: res.display_name})).catch(e => console.log(e))
//     getUserTopArtists(token).then(res => { this.setState({topArtists: res.items, loading: false})}).catch(e => console.log(e))
//   }

//   render() {

//     const { user, topArtists, loading} = this.state
//     const { navigate } = this.props.navigation

//     if (loading) {
//       return (
//         <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
//           <ActivityIndicator size="large" color="#FFFFFF" />
//         </LinearGradient>
//       )
//     }

//     return (
//       <List navigation={navigate} data={topArtists} title="Vos artistes du moment" />
//     );
//   }
// }

// const styles = {
//   header: {
//     height: '100%',
//     width: '100%',
//     justifyContent: 'center' 
//   }
// }


export default function Home({ navigation }) {

  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [topArtists, setTopArtists] = useState([]);
  useEffect( () => {
    async function getToken() {
      await AsyncStorage.getItem('token').then(res => setToken(res)); 
    }
    getToken()
  });
  useEffect(() => { me(token).then(res => setUser(res)) }, [])
  useEffect(() => { getUserTopArtists(token).then(res => setTopArtists(res)) }, [])

  return (
      <List navigation={navigation} data={topArtists.items} title="Vos artistes du moment" />
  );
}
