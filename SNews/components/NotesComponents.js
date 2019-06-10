import React,{Component} from 'react';
import {View,ScrollView,Image,Text,StyleSheet} from 'react-native';
import Comments from './Comments';
import NoteMenu from './NoteMenu';

export default class extends Component{

     constructor(props){
         super(props);
         this.state={
           media_photos:this.props.media_photos,
           showMenu:this.props.showMenu,
           new_in_list:this.props.new_in_list,
         }
     }


     render(){
        return(
            <View style={styles.container}>
              <View style={styles.noteContainer}>
                  {this.state.showMenu ? <NoteMenu/> : <View/> }
                  <View style={styles.imageContainer}>

                        <Image style = {styles.image}
                                              source={this.state.media_photos}
                                          />

                  </View>

                  <Text>
                      {this.state.new_in_list}
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
                   id_note={this.props.id_note}

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