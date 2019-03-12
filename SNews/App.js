import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './components/Login';
import Home from './components/Home';



// export default class App extends React.Component{
//
//
//   render(){
//     return (
//         <Login stack={stack}/>
//     );
//   }
// }

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
  //News: {screen: News},
});

const App = createAppContainer(MainNavigator);

export default App;

// const stack = createStackNavigator({
//     Home: { screen: Home},
// //La llave del objeto es el identificador del screen y lo vas a usar en el navigation.
// });
