import React,{Component} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import {Badge,Icon,Tooltip} from 'react-native-elements';


export default class CommentList extends Component{

    constructor(props){
       super(props)
       this.state={
          comments:this.props.comments,
      }
    }



    render(){

       return(
         <View>
           <View style={styles.containerComments}>
             {this.state.comments.map(
                     (v,i)=>
                          <Text key={i} style={styles.commentsBox}>{v}</Text>
             )}
          </View>
         </View>
       )
    }
}

const styles = StyleSheet.create({
    containerComments: {
        flex: 1,
        backgroundColor: '#55B1FE',
        padding:5
    },
    commentsBox:{
      borderRadius:5,
      borderWidth: 7,
      borderColor: '#fff',
      flex:1,
      backgroundColor: '#FFFFFF',
      marginBottom:5,
   },
});