import React,{Component} from 'react';
import {Header} from 'react-native-elements';
import {View} from 'react-native';

export default class CustomHeader extends Component{

     constructor(props){
        super(props)
        this.state={
            leftComponent:this.props.leftComponent,
            centerComponent:this.props.centerComponent,
            rightComponent:this.props.rightComponent,
        }
     }

     render(){
        return(

          <View>
             <Header
               leftComponent={this.state.leftComponent}
               centerComponent={this.state.centerComponent}
               rightComponent={{ icon: 'home', color: '#fff' }}
             />
          </View>

        )

     }
}

//leftComponent={{ icon: 'menu', color: '#fff' }}
  //             centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
    //           rightComponent={{ icon: 'home', color: '#fff' }}