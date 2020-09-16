import React, { Component } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const List = ({ token, navigation, data, title, checkRouting }) => {
    return (
      <SafeAreaView style={{ flexDirection: 'column'}}>
        <View style={{marginTop: '5%', marginLeft: '2%'}}>
          <Text style={{fontSize: 18, fontFamily: 'Inter_900Black', color: '#FFFFFF'}}>{title}</Text>
        </View>
        <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              extraData={data}
              keyExtractor={data => data.id}
              renderItem={(data) => 
                <TouchableOpacity onPress={() => checkRouting ? navigation.navigate('Details', { id: data.item.id, user_token: token }) : navigation.navigate('Tracks', { id: data.item.id, image: data.item && data.item.images[0].url ,user_token: token})}>
                  <View style={{padding: 5, alignItems: 'center'}}>
                    <Image style={{height: 100, width: 100 }} source={{ uri: data.item && data.item.images[1].url }} />
                    <Text style={{ marginTop: 10, color: '#FFFFFF', fontFamily: 'Inter_900Black' }}>{data.item && data.item.name}</Text>
                  </View>
                </TouchableOpacity>
              }
            />
        </View>
      </SafeAreaView>
    );
}