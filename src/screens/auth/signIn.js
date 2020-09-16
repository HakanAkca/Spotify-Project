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
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.animatableView}>
            <Image 
              source={require('../../../assets/common/logo.png')} 
              style={{
                height: 250, 
                width: 250,
                resizeMode: 'contain',
              }}  
            />
          </Animatable.View>
          <View style={styles.buttonContainer}>
            <Button 
              title="S'INSCRIRE GRATUITEMENT" 
              containerStyle={{width: '80%'}} 
              buttonStyle={{ borderRadius: 20, backgroundColor: '#1DB954', padding: 10 }} 
              titleStyle={{fontSize: 14 }} 
            />
            <Button
              title="CONTINUER AVEC FACEBOOK" 
              containerStyle={{ width: '80%', position: 'relative' }} 
              buttonStyle={styles.buttonStyle} 
              titleStyle={{fontSize: 14}}
            />
            <Button 
              title="CONTINUER AVEC APPLE" 
              containerStyle={{width: '80%'}} 
              buttonStyle={styles.buttonStyle} 
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
  header: {
    height: '100%',
    width: Dimensions.get('window').width
  },

  animatableView: {
    flex: 2, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  buttonStyle: {
    borderRadius: 20, 
    backgroundColor: '#000000', 
    padding: 10, 
    borderWidth: 1.2, 
    borderColor: 'grey' 
  }
};