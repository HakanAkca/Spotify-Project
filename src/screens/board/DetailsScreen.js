import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Icon } from 'react-native-elements'
import moment from 'moment'

import Details from '../../components/Details'

export default class DetailsScreen extends Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Details navigation={this.props.navigation} id={this.props.route.params.id} />    
      )
    }
  }