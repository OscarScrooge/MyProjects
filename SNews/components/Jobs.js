import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import Notes from './Notes';
import CustomHeader from './CustomHeader';
import CustomAvatar from './CustomAvatar';


export default class Jobs extends Component {

      constructor(props){
        super(props);
        const { navigation } = this.props;
         this.state={

                   jobs:{
                      images:null,
                      notes:''
                   },
                   user_account:navigation.getParam('user_account'),
                   avatar_source:navigation.getParam('avatar_source'),
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
              <CustomHeader centerComponent={<CustomAvatar avatar_source={this.state.avatar_source} size={'medium'}/>}/>
              { this.state.jobs.images!=null ? <Notes images={this.state.jobs.images} showMenu={false}/> : <Text>Cargando Trabajos...</Text>  }
          </View>
        );
      }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A3A3A3',
    },

});