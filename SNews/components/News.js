import React,{Component} from  'react';
import { Text, View,StyleSheet } from 'react-native';
import Notes from './Notes';

export default class News extends Component{

     constructor(props){
       super(props);
        this.state={

            news:{
               images:null,
               notes:''
            }
        }

     }

     componentDidMount(){
             let list=[];
             let newsAux= this.state.news;
           for(var i=0;i<10;i++){
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

                    { this.state.news.images!=null ? <Notes images={this.state.news.images}/> : <Text>Cargando Noticias...</Text>  }

                  </View>

         )

     }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});