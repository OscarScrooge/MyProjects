import React ,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Button,Input,Icon} from 'react-native-elements';
import CustomAvatar from './CustomAvatar';


export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            user_login:{
                user_name:'papichulo',
                password:'papito'
            },
            user_account:{},
            is_user:false,
            avatar_source:{uri:''},
        };

        this.handleInput=this.handleInput.bind(this);
        this.handleAvatar=this.handleAvatar.bind(this);
    }

    handleInput(key,text){
        let aux=this.state.user_login;
        aux[key]=text;
        this.setState({
            user_login:aux
        },function () {
            console.log(this.state.user_login);
        });

    }

     handleAvatar(avatar_url,avatar){
       return fetch('http:192.168.1.69:8000/avatar/'+avatar_url+'/'+avatar)
                    .then((response) => response.json())
                    .then((responseJson) => {
                           let source = 'data:'+responseJson.type+';base64,'+responseJson.data;
                           let avatar = this.state.avatar_source;
                           avatar.uri = source;
                           this.setState({
                                 avatar_source:avatar,
                           },()=>
                             this.props.navigation.navigate('Home',{user_account:this.state.user_account,avatar_source:this.state.avatar_source}))
                    })
                    .catch((error) => {
                         console.error(error);
                    });

    }

    handleUserAccount(){

      return fetch('http://192.168.1.69:8000/user/account/'+this.state.user_login.user_name+'/'+this.state.user_login.password)
              .then((response) => response.json())
              .then((responseJson) => {
                    this.setState({
                       is_user:true,
                       user_account:responseJson,
                    },()=>
                        this.handleAvatar(this.state.user_account.avatar_url,this.state.user_account.avatar)
                    )
                    return responseJson;
                  })
                  .catch((error) => {
                    console.error(error);
                  });

    }


    render(){


        return (
            <View style={styles.container}>

                <CustomAvatar
                   showEditButton={false}
                   picture={''} size={'xlarge'}
                   avatar_source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                />
                <Input
                  placeholder='Usuario'
                  leftIcon={<Icon name='envelope' type='font-awesome'/>}
                  onChangeText={(text)=>this.handleInput('user_name',text)}
                />
                <Input
                  placeholder='Contrasenia' password
                  leftIcon={<Icon name='key' type='font-awesome'/>}
                  onChangeText={(text)=>this.handleInput('password',text)}
                />
           <View style={styles.v}>
              <View style = {styles.v1}>
                    <Button  title='Log in'  backgroundColor={'orange'}
                      onPress={() => this.handleUserAccount()}
                      style={{width:'100%'}}
                    />

              </View>
              <View style = {styles.v2}>
                    <Button raise title='Registro'  backgroundColor={'blue'}
                      onPress={() => navigate('SignIn')}
                    />
               </View>
           </View>
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
    v:{
      flexDirection: 'row',
      width:'100%',
    },
     v1:{
          width:'50%',
          alignItems: 'center',

        },
    v2:{
             width:'50%',
             alignItems: 'center',

           }
});
