import React,{Component} from 'react';
import { Button } from 'react-native-elements';
import {View,StyleSheet} from 'react-native';


export default class AddNoteButton extends Component{

      constructor(props){
          super(props)
          this.state={
             title:this.props.title,
             navigate: this.props.navigate,
             view:this.props.view,
          }
      }


      render(){
         return(
            <View style={styles.addNewButton}>
                   <Button
                           title={this.state.title}
                           onPress={() => this.state.navigate(this.state.view,{user_account:this.props.user_account})}
                   />
            </View>

         )
      }
}


const styles = StyleSheet.create({

    addNewButtonContainer:{
        width:'100%',
    },
    addNewButton:{
       borderRadius:10,
       borderWidth: 6,
       borderColor: '#fff',
       flex:1
    },
});