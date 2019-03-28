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
            user_account:navigation.getParam('user_account'),
            avatar_source:navigation.getParam('avatar_source'),
        }
        console.log(this.state.avatar_source)
     }

     componentDidMount(){
             let list=[];
             let newsAux= this.state.news;
           for(var i=0;i<5;i++){
             this.getImages(list,newsAux);
           }


      }

      getImages(list,newsAux){

          return fetch('https://source.unsplash.com/random')

                       .then((responseJson) => {

                         list.push({'url':responseJson.url});
                         newsAux.images=list;
                         this.setState({
                            news:newsAux,
                         });
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

                    { this.state.news.images!=null ? <Notes images={this.state.news.images} showMenu={false}/> : <Text>Cargando Noticias...</Text>  }
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