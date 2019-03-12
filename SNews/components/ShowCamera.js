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

export default class ShowCamera extends Component {

  constructor(props){
      super(props);

  }



  async  requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:'Cool Photo App needs access to your camera so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Cool Photo App Camera Permission',
              message:'Cool Photo App needs access to your camera so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                          title: 'Cool Photo App Camera Permission',
                          message:'Cool Photo App needs access to your camera so you can take awesome pictures.',
                          buttonNeutral: 'Ask Me Later',
                          buttonNegative: 'Cancel',
                          buttonPositive: 'OK',
                        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}



takePicture = async () => {
    try {
      const data = await this.camera.capture();
      console.log('Path to image: ',data.path);
    } catch (err) {
       console.log('err: ', err);
    }
  };



  render() {
    return (
      <View style={styles.container}>

                           <Camera
                                       ref={cam => {
                                         this.camera = cam;
                                       }}
                                       style={styles.preview}
                                       aspect={Camera.constants.Aspect.fill}
                                       captureAudio={false}
                                 >
                                     <View style={styles.captureContainer}>
                                         <TouchableOpacity  onPress={this.takePicture}>
                                           <Text>Take Photo</Text>
                                         </TouchableOpacity>
                                       </View>
                                     <View  />
                                 </Camera>
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
       height: 40,
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
      }
});