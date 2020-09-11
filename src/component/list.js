import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Image, Text, TouchableOpacity, Animated, Easing, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const List = ({ token, navigation, data, title }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get('window').width}}>
        <LinearGradient colors={['#3f6b6b', '#121212']} style={styles.header}>
            <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <View style={{marginTop: '5%', marginLeft: '2%'}}>
                <Text style={{fontSize: 18}}>{title}</Text>
              </View>
              <View style={{padding: '5%', marginBottom: '5%'}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    numColumns={2}
                    data={data}
                    keyExtractor={data => data.id}
                    renderItem={(data) => 
                      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: data.item.id, user_token: token})}>
                        <View style={{padding: 5, alignItems: 'center'}}>
                          <Image style={{height: 160, width: 160 }} source={{ uri: data.item.images[0].url }} />
                          <Text style={{marginTop: '1%', color: '#FFFFFF'}}>{data.item.name}</Text>
                          <Text style={{fontSize: 10, color: '#FFFFFF'}}>{data.item.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Followers</Text>
                        </View>
                      </TouchableOpacity>
                    }
                  />
              </View>
            </SafeAreaView>
        </LinearGradient>
      </View>
    );
}

const styles = StyleSheet.create({
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
});