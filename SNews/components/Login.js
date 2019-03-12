import React ,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Button,Avatar, Input,Icon} from 'react-native-elements';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            usuario:{
                user:'',
                password:''
            }

        };

        this.handleInput=this.handleInput.bind(this);
    }

    handleInput(key,e){
        let aux=this.state.usuario;
        aux[key]=e.target.value;
        this.setState({
            usuario:aux
        },function () {
            console.log(this.state.usuario);
        });

    }



    render(){

        const {navigate} =this.props.navigation;

        return (
            <View style={styles.container}>
                <Avatar
                    xlarge
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
<Input
  placeholder='Correo'
  leftIcon={<Icon name='envelope' type='font-awesome'/>}
/>
<Input
  placeholder='Contrasenia' password
  leftIcon={<Icon name='key' type='font-awesome'/>}
/>
           <View style={styles.v}>
              <View style = {styles.v1}>
                <Button  title='Log in'  backgroundColor={'orange'}
                  onPress={() => navigate('Home')}
                  style={{width:'100%'}}
                />
              </View>
              <View style = {styles.v2}>
                <Button raise title='Registro'  backgroundColor={'blue'}
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
