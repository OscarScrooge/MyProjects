import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Notes from './Notes';


export default class Jobs extends Component {

  constructor(props){
    super(props);
     this.state={
   
               jobs:{
                  images:null,
                  notes:''
               }
           }
  }
  
         componentDidMount(){
               let list=[];
               let jobsAux= this.state.jobs;
             for(var i=0;i<10;i++){
               this.getImages(list,jobsAux);
             }
  
  
        }
  
        getImages(list,jobsAux){
  
            return fetch('https://source.unsplash.com/random')
  
                         .then((responseJson) => {
  
                           list.push({'url':responseJson.url});
                           jobsAux.images=list;
                           this.setState({
                              jobs:jobsAux,
                           });
                         })
                         .catch((error) => {
                           console.error(error);
                         });
        }


  render() {
    return (
      <View style={styles.container}>
      { this.state.jobs.images!=null ? <Notes images={this.state.jobs.images}/> : <Text>Cargando Noticias...</Text>  }
      </View>
    );
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