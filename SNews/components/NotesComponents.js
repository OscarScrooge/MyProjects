import React,{Component} from 'react';
import {View,ScrollView,Image,Text,StyleSheet} from 'react-native';
import Comments from './Comments';
import NoteMenu from './NoteMenu';

export default class extends Component{

     constructor(props){
         super(props);
         this.state={
           images:this.props.images,
           showMenu:this.props.showMenu,
         }
     }

     render(){
        return(
            <View style={styles.container}>
              <View style={styles.noteContainer}>
                  {this.state.showMenu ? <NoteMenu/> : <View/> }
                  <View style={styles.imageContainer}>
                      <Image style = {styles.image}
                          source={{ uri: this.state.images.url}}
                      />
                  </View>

                  <Text>
                      Bacon ipsum dolor amet pancetta beef ribs picanha alcatra hamburger andouille
                  </Text>
              </View>
              <View>
              <Comments
                   /**
                     handleShowCommentBox: it is a fuction which comes from Notes component
                     shareComment: it is a flag(true or false) to share the new comment made by the user which comes from Notes and SaySomething components
                     comment: it is the comment made by the user which comes from Notes and SaySomething components
                   */
                   handleShowCommentBox={this.props.handleShowCommentBox}
                   shareComment={this.props.shareComment}
                   comment={this.props.comment}
                   handleComment={this.props.handleComment}
                   handleShareComment={this.props.handleShareComment}

               />
              </View>
            </View>
        )

     }
}

const styles = StyleSheet.create({
    imageContainer: {
       width:'100%',
       height:200,
       paddingTop:10,
    },
    image: {
           width:'100%',
           height:'100%',

        },
    noteContainer:{
       backgroundColor:'#FFFFFF'
    },

    container: {
            marginBottom: 0
        },
})