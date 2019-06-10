import React,{Component} from 'react';
import {View,ScrollView,Image,Text,StyleSheet,TextInput,} from 'react-native';
import NotesComponents from './NotesComponents';
import SaySomething from './SaySomething';

export default class extends Component{

     constructor(props){
         super(props);
         this.state={
           showMenu:this.props.showMenu,
           showCommentBox:false,
           shareComment:false,
           news_list : this.props.news_list,
           user_account:this.props.user_account,
           type_note:this.props.new,
           newComment:{
              id_new:'',
              id_who_comment:this.props.user_account.id,
              media_photo:'',
              media_video:'',
              comment:null,
           }
         }
         this.handleShowCommentBox=this.handleShowCommentBox.bind(this);
         this.handleComment= this.handleComment.bind(this);
         this.handleShareComment= this.handleShareComment.bind(this);
     }

     handleShowCommentBox(status,id_note){
         let newComment = this.state.newComment;
         newComment['id_new']= id_note;

         this.setState({
           newComment:newComment,
           showCommentBox:status,
         },()=>console.log(this.state.newComment));
     }

     handleComment(text){
           let newComment = this.state.newComment;
           newComment['comment']= text
           this.setState({
             newComment:newComment,
           });
     }

     handleShareComment(status,showCommentBox){
           if(this.state.newComment.comment){

              this.setState({
                   shareComment:status,
                   showCommentBox:showCommentBox,
               },function(){
                 if(this.state.shareComment){
                   this.props.postComment(this.state.newComment);
                 }
               });
           }


     }

     render(){
        return(
            <View style={styles.container}>
                <ScrollView >
                    {
                     this.state.news_list.map(
                        (item,index)=>
                          <NotesComponents
                              key={index}
                              media_photos={{uri:item.media_photos}}
                              showMenu={this.state.showMenu}
                              handleShowCommentBox={this.handleShowCommentBox}
                              shareComment={this.state.shareComment}
                              comment={this.state.newComment.comment}
                              handleComment={this.handleComment}
                              handleShareComment={this.handleShareComment}
                              new_in_list={item.new}
                              id_note={item.id}
                         />
                     )
                    }
                </ScrollView>
                {  this.state.showCommentBox ?
                          <SaySomething
                              handleComment={this.handleComment}
                              handleShareComment={this.handleShareComment}
                          />

                          :<View></View>
                }

            </View>
        )

     }
}
const styles = StyleSheet.create({
    container:{
       flex:1,
    },
});