import React,{Component} from  'react';
import { Text, View,StyleSheet} from 'react-native';
import Notes from './Notes';
import CustomHeader from './CustomHeader';
import { Button } from 'react-native-elements';
import CustomAvatar from './CustomAvatar';
import AddNoteButton from './AddNoteButton'

export default class MyNews extends Component{

     constructor(props){
       super(props);
       const { navigation } = this.props;
        this.state={
            myNews:{
               images:null,
               notes:''
            },
            user_account:navigation.getParam('user_account'),
            avatar_source:navigation.getParam('avatar_source'),
        }

     }

     componentDidMount(){
             let list=[];
             let newsAux= this.state.myNews;
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
                            myNews:newsAux,
                         });
                       })
                       .catch((error) => {
                         console.error(error);
                       });
      }

     render(){
          const { navigate } = this.props.navigation;

         return(

                  <View style={styles.container}>
                    <CustomHeader
                        leftComponent={<CustomAvatar avatar_source={this.state.avatar_source} size={'medium'}/>}
                        centerComponent = {
                                            <AddNoteButton
                                                title={'Crea Noticia'}
                                                navigate = {navigate}
                                                view={'AddNews'}
                                                user_account={this.state.user_account}
                                            />
                                          }
                    />
                    { this.state.myNews.images!=null ? <Notes images={this.state.myNews.images} showMenu={true}/> : <Text>Cargando Noticias...</Text>  }

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