import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {Button,Avatar, Input,Icon} from 'react-native-elements';
import CustomAvatar from './CustomAvatar';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Choose Image',
  takePhotoButtonTitle: 'Take from camera',
  chooseFromLibraryButtonTitle: 'Choose From Library',
   storageOptions: {
      cameraRoll: true,
      path:'Camera',
    },
};

export default class SignIn extends Component{

    constructor(props){
      super(props);
      this.state={
         user:{
            user_name:'',
            email:'',
            password:'',
            avatar:'',
            avatar_source:{uri:''},
            avatar_name:'',
            avatar_string:'',
         }
      }
      this.handleLaunchImageLibrary =this.handleLaunchImageLibrary.bind(this);
    }
    handleDataInput(key,text){

       let userAux = this.state.user;
       userAux[key]=text;

       this.setState({

          user:userAux,
       },()=> console.log(this.state.user))

    }

    handlePostData(){
         let user= this.state.user;
         user.avatar='./news/dusers/'+this.state.user.user_name+this.state.user.email+'/avatar/'+this.state.user.avatar_name;
         this.setState({
            user:user
         })
        return fetch('http://192.168.1.69:8000/user/',
          {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(this.state.user)
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

    componentDidMount(){
        return fetch('http://192.168.1.69:8000/avatar/1/')
               .then((response) => response.json())
               .then((responseJson) => {
                     let userAux=this.state.user;
                     userAux.avatar_source.uri='data:'+responseJson.type+';base64,'+responseJson.data;
                     userAux.avatar_string= responseJson.data;
                     userAux.avatar_name='user_default.png';
                     this.setState({
                            user:userAux,
                     })
                     return responseJson;
                   })
                   .catch((error) => {
                     console.error(error);
                   });

    }

    handleLaunchImageLibrary(){
        ImagePicker.launchImageLibrary(options, (response) => {

                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);

                    } else {
                      console.log(response);
                      const source = 'data:'+response.type+';base64,' + response.data;

                        let userAux=this.state.user;
                            userAux.avatar_name=response.fileName;
                            userAux.avatar_source.uri = source;
                            userAux.avatar_string=response.data;
                            this.setState({
                                user:userAux,
                            })
                        return response;
                    }
            });
     }

    render(){

         return(

               <View style={styles.container}>
                    <View style={{alignItems: 'center',}}>
                       <CustomAvatar
                            picture={''}
                            size={'xlarge'}
                            avatar_source={this.state.user.avatar_source}
                            showEditButton={true}
                            handleLaunchImageLibrary={this.handleLaunchImageLibrary}
                       />
                    </View>
                    <View >
                       <Input
                          placeholder='Nombre de usuario'
                          leftIcon={<Icon name='user' type='font-awesome'/>}
                          onChangeText={(text) => this.handleDataInput('user_name',text)}
                       />
                    </View>
                    <View >
                       <Input
                          placeholder='Correo'
                          leftIcon={<Icon name='envelope' type='font-awesome'/>}
                          onChangeText={(text) => this.handleDataInput('email',text)}
                       />
                    </View>
                    <View style={{flex:1}}>
                       <Input
                          placeholder='Contrasenia' password
                          leftIcon={<Icon name='key' type='font-awesome'/>}
                          onChangeText={(text) => this.handleDataInput('password',text)}
                       />
                    </View>
                    <View style={{flex:1}}>
                       <Button
                          title='Registrar'
                          backgroundColor={'orange'}
                          onPress={()=>this.handlePostData()}
                          style={{width:'100%'}}
                       />
                    </View>


               </View>
         )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection:'column'
    },
});