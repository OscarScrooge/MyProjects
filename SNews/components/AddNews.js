import React, { Component } from 'react';
import {Alert,
        CameraRoll,
        Text,
        View,
        StyleSheet,
        TextInput,
        Button ,
        ScrollView,
        PermissionsAndroid,
        Image,TouchableOpacity} from 'react-native';
import Camera from 'react-native-camera';
import ShowCamera from './ShowCamera';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';


const options = {
  title: 'Choose Image',
  takePhotoButtonTitle: 'Take from camera',
  chooseFromLibraryButtonTitle: 'Choose From Library',
   storageOptions: {
      cameraRoll: true,
      path:'Camera',
    },
};

export default class AddNews extends Component {

  constructor(props){
      super(props);
      this.state={
          text:'',
          pictureSource:null,
      }
  }

  handleLaunchCamera(){

     ImagePicker.launchCamera(options, (response) => {
       console.log('Response = ', response);

             if (response.didCancel) {
               console.log('User cancelled image picker');
             } else if (response.error) {
               console.log('ImagePicker Error: ', response.error);

             } else {
               const source = { uri: response.uri };

               // You can also display the image using data:
               // const source = { uri: 'data:image/jpeg;base64,' + response.data };

               this.setState({
                 pictureSource: source,
               });
             }
     });
  }

  handleLaunchImageLibrary(){
     ImagePicker.launchImageLibrary(options, (response) => {
           console.log('Response = ', response);

                 if (response.didCancel) {
                   console.log('User cancelled image picker');
                 } else if (response.error) {
                   console.log('ImagePicker Error: ', response.error);

                 } else {
                   const source = { uri: response.uri };

                   // You can also display the image using data:
                   // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                   this.setState({
                     pictureSource: source,
                   });
                 }
         });


  }

  render() {
    return (
      <View style={styles.container}>
       <Icon
         name='camera'
         type='font-awesome'
         color='#517fa4'
         onPress={()=>this.handleLaunchCamera()}
       />
        <Icon
                name='image'
                type='font-awesome'
                color='#517fa4'
                onPress={()=>this.handleLaunchImageLibrary()}
              />
          <TextInput  style={styles.textInputStyle} onChangeText={(text)=>this.setState({text})}/>
        <Image source={this.state.pictureSource} style={styles.pictureViewer}/>
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
    textInputStyle:{
       width:'90%',
       height: 200,
       borderColor: 'gray',
       borderWidth: 1,
    },
     preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
      },
      pictureViewer:{
         width:'100%',
         height:300,
      }
});
