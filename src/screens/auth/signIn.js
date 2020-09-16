import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import { AuthContext } from '../../services/AuthContext'

export const SignIn = ({ navigation }) =>  {

  const { signIn } = useContext(AuthContext)

  return (
    <View styl={{ flex: 1 }}>
      <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
        <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Image 
              source={require('../../../assets/common/logo.png')} 
              style={{
                height: 250, 
                width: 250,
                resizeMode: 'contain',
              }}  
            />
          </Animatable.View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <Button 
              title="S'INSCRIRE GRATUITEMENT" 
              containerStyle={{width: '80%'}} 
              buttonStyle={{ borderRadius: 20, backgroundColor: '#1DB954', padding: 10 }} 
              titleStyle={{fontSize: 14 }} 
            />
            <Button
              title="CONTINUER AVEC FACEBOOK" 
              containerStyle={{ width: '80%', position: 'relative' }} 
              buttonStyle={{ borderRadius: 20, backgroundColor: '#000000', padding: 10, borderWidth: 1.2, borderColor: 'grey' }} 
              titleStyle={{fontSize: 14}}
            />
            <Button 
              title="CONTINUER AVEC APPLE" 
              containerStyle={{width: '80%'}} 
              buttonStyle={{ borderRadius: 20, backgroundColor: '#000000', padding: 10, borderWidth: 1.2, borderColor: 'grey' }} 
              titleStyle={{ fontSize: 14 }}
            />
            <TouchableOpacity onPress={() => signIn()}>
              <Text style={{fontSize: 14, color: '#FFFFFF'}}>SE CONNECTER</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = {
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
};