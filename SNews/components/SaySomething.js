import React,{Component} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

export default class SaySomething extends Component{

    constructor(props){
       super(props)
    }


    render(){

       return(
         <View style={styles.container}>
           <TextInput
                style={styles.comment}
                onChangeText={(text) => this.props.handleComment(text)}
           />
           <Icon
             name='paper-plane'
             type='font-awesome'
             color='#517fa4'
             /**
               handleShareComment(status,showCommentBox)
               status: status to show the new comment made by the user
               showCommentBox: status to show or hide the comment box, in this case is false
             */
             onPress={()=>this.props.handleShareComment(true,false)}
           />
        </View>


       )

    }
}

const styles = StyleSheet.create({
         container: {
            height: 60,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#CFD9E4',
            flex:1,
            flexDirection:'row',
          },
          comment:{
           borderRadius:5,
           borderWidth: 3,
           borderColor: '#fff',
           backgroundColor: '#fff',
           marginTop:'3%',
           marginBottom:'3%',
           marginLeft:'2%',
           flex:1,
          },
          icon:{
            flex:1,
            paddingTop:5,
          }

});