import React, { Component, useContext } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { AuthContext } from '../../services/AuthContext'

export const Settings = ({ navigation }) =>  {

  const { signOut } = useContext(AuthContext)

  return (
    <View styl={{ flex: 1 }}>
      <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => signOut()}>
                <Text style={{fontSize: 14, color: '#FFFFFF'}}>SE DECONNECTER</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = {
  header: {
    height: '100%',
    width: '100%'
  }
};