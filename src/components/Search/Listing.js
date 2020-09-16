import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import ListItem from "./ListItem";
import Separator from "./Separator";

export default ({ items, onEndReached, navigation }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Separator />}
    onEndReached={onEndReached}
    ListEmptyComponent={() => {
      return (
        <View style={styles.emptyText}>
          <Text style={{ fontFamily: 'Inter_900Black' }}>Aucune musique.</Text>
        </View>
      )
    }}
    contentContainerStyle={styles.container}
  />
);

const styles = {
  container: {
    margin: 10
  },
  emptyText: {
    alignItems: 'center'
  }
}