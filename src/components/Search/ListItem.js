import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default ({ item, navigation }) => (
  <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Details', { id: item.id })}>
    <Image source={item && item.images.length > 0 ? { uri: item.images[0].url } : require('../../../assets/common/logo.png')} style={styles.image} />
    <Text style={styles.title}>{item && item.name}</Text>
  </TouchableOpacity>
);

const styles = {
  container: {
    flexDirection: "row",
    alignItems: 'center'
  },
  image: {
    resizeMode: 'cover',
    width: 80,
    height: 80
  },
  title: {
    marginLeft: 10,
    color: '#FFFFFF', 
    fontFamily: 'Inter_900Black'
  }
};
