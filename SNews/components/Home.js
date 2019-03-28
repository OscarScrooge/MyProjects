import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Jobs from './Jobs';
import News from './News';
import MyNews from './MyNews';


const TabNavigator = createBottomTabNavigator({
  'Noticias': props => <News {...props}/>,
  'Trabajos': props => <Jobs {...props}/>,
  'MisNoticias': props => <MyNews {...props}/> ,
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