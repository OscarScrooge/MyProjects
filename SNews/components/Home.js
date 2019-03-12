import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import AddNews from './AddNews';
import Jobs from './Jobs';
import News from './News';


const TabNavigator = createBottomTabNavigator({
  'Noticias': News,
  'Trabajos': Jobs,
  'Publicar Noticia': AddNews,

});

const Home = createAppContainer(TabNavigator);

export default Home

/*export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});*/