import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import './global';

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestBlock: {},
    }
  }

  componentWillMount() {
    web3.eth.getBlock('latest')
      .then(latestBlock => {
        console.log(latestBlock);
        this.setState({ latestBlock });
      });
  }

  render() {
    const latestBlockNumber = this.state.latestBlock.number;

    return (
      <View style={styles.container}>
        <Text>Latest ethereum block is: {latestBlockNumber}</Text>
        <Text>Check your console!</Text>
        <Text>You should find extra info on the latest ethereum block.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});


 