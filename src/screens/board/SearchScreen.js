import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Search from "../../components/Search/Search";
import Listing from "../../components/Search/Listing";
// import search from "../../src/api/search";

const PAGE = 20;

export default class SearchScreen extends Component {
  state = {
    songs: [],
    offset: 0,
    query: "Drake",
    isFetching: false,
    isEmpty: false,
    token: null,
    isTokenFetching: false
  };

  async loadNextPage() {
    const { songs, offset, query, token, isFetching, isEmpty } = this.state;

    if (isFetching || isEmpty) return;

    this.setState({ isFetching: true });
    const newSongs = await search({
      offset: offset,
      limit: PAGE,
      q: query,
      token
    });

    if (newSongs.length === 0) {
      this.setState({ isEmpty: true });
    }

    this.setState({
      isFetching: false,
      songs: [...songs, ...newSongs],
      offset: offset + PAGE
    });
  }

  async componentDidMount() {
    await this.loadNextPage();
  }

  handleSearchChange(text) {
    this.setState(
      {
        isEmpty: false,
        query: text,
        offset: 0,
        songs: []
      },
      () => {
        this.loadNextPage();
      }
    );

    console.log("search text is", text);
  }

  async handleEndReached() {
    await this.loadNextPage();
  }

  render() {
    const { songs, query, isFetching } = this.state;

    return (
       <LinearGradient colors={['#3f6b6b', '#121212']} style={{height: '100%'}}>
        <Search onChange={text => this.handleSearchChange(text)} text={query} />
        {isFetching && songs.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <Listing items={songs} onEndReached={() => this.handleEndReached()} />
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 10,
    marginTop: 50
  }
});