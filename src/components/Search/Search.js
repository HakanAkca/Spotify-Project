import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

export default class Seacrh extends Component {
  constructor({ text }) {
    super();
    this.state = {
      text: text || ""
    };
  }

  handleChangeText(newText) {
    const { onChange } = this.props;
    this.setState(
      {
        text: newText
      },
      () => {
        onChange && onChange(newText);
      }
    );
  }

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontFamily: 'Inter_900Black', color: '#FFFFFF'}}>Rechercher</Text>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Artists, titres ou podcasts."
          underlineColorAndroid="transparent"
          onChangeText={newText => this.handleChangeText(newText)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 10
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "green",
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 40,
    borderRadius: 5,
    marginBottom: 10
  }
};
