import React,{Component} from 'react';
import {View,StyleSheet,Text,TextInput} from 'react-native';
import {Badge,Icon,Tooltip} from 'react-native-elements';
import CommentList from './CommentList';

export default class Comments extends Component{

    constructor(props){
       super(props)
       this.state={
          comments:[],
          totalComments:150,
          indicator:'',
          iconArrowType:'sort-down',
          iconSource:'font-awesome',
          showList:false,
          key:'down',
          arrowMarginTop:15,
          saySomething:false,
      }
      this.handleNewComments=this.handleNewComments.bind(this);
    }

    componentDidMount(){
       this.handleComments();
       this.setState({
          indicator:'comentarios 99+',
       })
    }

    handleComments(){

        return fetch('http:192.168.1.69:8000/comment/by/new/id/'+this.props.id_note)
              .then((response) => response.json())
              .then((responseJson) => {
                     this.setState({
                          comments:responseJson
                     });
                  })
                 .catch((error) => {
                      console.error(error);
                 });
    }

    handleNewComments(){
         let newComment=[];
         newComment=this.state.comments;
         newComment.push(this.props.comment);
         this.setState({
           comments: newComment,
         });

         this.props.handleShareComment(false,false);

    }

    handleCommentsList(key){

     if(key=='down'){
         this.setState({
                 showList:true,
                 iconArrowType:'sort-up',
                 key:'up',
                 arrowMarginTop:21,
              })
        this.props.handleShowCommentBox(true,this.props.id_note)

     }else{
         this.setState({
                 showList:false,
                 iconArrowType:'sort-down',
                 key:'down',
                 arrowMarginTop:15,
              })
         this.props.handleShowCommentBox(false,this.props.id_note)
     }
    }


    handleMenu(show){
         if(show){
           this.setState({
             showMenu:true,
           })
         }

    }

    render(){

       return(
         <View>
            <View style={styles.badge_arrow_Container}>
               <View style={styles.badge_comments}>
                 <View style={styles.badge}>
                  <Badge value={this.state.indicator} status="error" />
                 </View>
                 <View style={styles.commentIconContainer}>
                   <Icon
                      size={25}
                      name='comment'
                      type='font-awesome'
                      onPress={()=>this.handleCommentsList('down')}
                   />
                 </View>
               </View>
               <View style={[styles.arrowContainer,{marginTop:this.state.arrowMarginTop}]}>
                 <Icon
                   size={20}
                   name={this.state.iconArrowType}
                   type={this.state.iconSource}
                   color='#000000'
                   onPress={()=>this.handleCommentsList(this.state.key)}
                 />
               </View>
            </View>

          {
                this.state.totalComments>0 && this.state.showList
                         ?
                           <CommentList comments={this.state.comments}/>
                         :
                         <View>
                            <Text>{''}</Text>
                         </View>

          }
           { this.props.shareComment ?
                       this.handleNewComments()
                             :
                       <View></View>
           }
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
    badge_arrow_Container:{
       flex:1,
       backgroundColor: '#fff',
       flexDirection:'column',
       alignItems:'center',
       position:'relative',
    },
    badge_comments:{
       flex:1,
       position:'absolute',
       flexDirection:'row',
    },
    badge:{
       flex:1,
       marginLeft:'8%',
    },
    commentIconContainer:{
       alignItems:'flex-end',
       marginRight:'2%',
    },
    arrowContainer:{
      flex:1,
      zIndex:-1,
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