import React,{Component} from  'react';
import { Text, View,StyleSheet } from 'react-native';
import Notes from './Notes';
import CustomHeader from './CustomHeader';
import CustomAvatar from './CustomAvatar';



export default class News extends Component{

     constructor(props){
       super(props);
       const { navigation } = this.props;

        this.state={
            news:{
               images:null,
               notes:''
            },
            news_list:null,
            user_account:navigation.getParam('user_account'),
            avatar_source:navigation.getParam('avatar_source'),
        }

        this.postComment=this.postComment.bind(this);
     }

     componentDidMount(){
           this.getNewsList();
      }

      getNewsList(){
         return fetch('http://192.168.1.69:8000/new/list/')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                      news_list:responseJson,
                    })
                })
                .catch((error) => {
                     console.error(error);
                });
      }

      postComment(comment){
           return fetch('http://192.168.1.69:8000/comment/',
                   {
                     method:'POST',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                       },
                     body: JSON.stringify(comment)
                   }
                 ).then((response) => response.json())
                 .then((responseJson) => {
                       console.log(responseJson)
                       return responseJson;
                     })
                     .catch((error) => {
                       console.error(error);
                     });


      }

     render(){

         return(

                  <View style={styles.container}>
                      <CustomHeader
                              centerComponent={<CustomAvatar avatar_source={this.state.avatar_source} size={'medium'}/>}
                      />

                    { this.state.news_list!=null ?
                                                  <Notes
                                                          showMenu={false}
                                                          news_list={this.state.news_list}
                                                          user_account={this.state.user_account}
                                                          postComment={this.postComment}
                                                  />

                                                   :
                                                    <Text>Cargando Noticias...</Text>  }
                  </View>

         )

     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A3A3A3',
    },
});