import React,{Component} from 'react';
import {View,ScrollView,Image,Text,StyleSheet,TextInput,} from 'react-native';
import NotesComponents from './NotesComponents';
import SaySomething from './SaySomething';

export default class extends Component{

     constructor(props){
         super(props);
         this.state={
           images:this.props.images,
           showMenu:this.props.showMenu,
           showCommentBox:false,
           comment:'',
           shareComment:false,
         }
         this.handleShowCommentBox=this.handleShowCommentBox.bind(this);
         this.handleComment= this.handleComment.bind(this);
          this.handleShareComment= this.handleShareComment.bind(this);
     }

     handleShowCommentBox(status){
         this.setState({
           showCommentBox:status
         });
     }

     handleComment(status){
           this.setState({
             comment:status
           });
     }

     handleShareComment(status,showCommentBox){
           this.setState({
                  shareComment:status,
                  showCommentBox:showCommentBox,
           });

     }

     render(){
        return(
            <View style={styles.container}>
                <ScrollView >
                    {
                     this.state.images.map(
                        (item,index)=>
                          <NotesComponents
                              key={index}
                              images={item}
                              showMenu={this.state.showMenu}
                              handleShowCommentBox={this.handleShowCommentBox}
                              shareComment={this.state.shareComment}
                              comment={this.state.comment}
                              handleComment={this.handleComment}
                              handleShareComment={this.handleShareComment}
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