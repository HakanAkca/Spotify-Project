import React, { Component, useContext } from 'react';
import { SafeAreaView, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../../services/AuthContext'

export const Settings = ({ navigation }) =>  {

  const { signOut } = useContext(AuthContext)

  return (
    <View styl={{ flex: 1 }}>
      <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
};