import React, { Component } from 'react';
import {
        View,
        StyleSheet,
        TextInput,
        Button ,
        Image
        } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import CustomHeader from './CustomHeader';


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
       const { navigation } = this.props;
      this.state={
          text:'',
          pictureDataB64:null,
          myNew:{
             id_user:navigation.getParam('user_account').id,
             new:'lorem ipsum',
             media_photos:'',
             media_videos:'',
             photos_url:'./news/dusers/'+navigation.getParam('user_account').user_name+navigation.getParam('user_account').email+'/content/',
             videos_url:'',
             pictureData:'',
          },          
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

               const source = { uri: 'data:'+response.type+';base64,' + response.data };

               let myNewAux=this.state.myNew;               
               myNewAux.media_photos=response.fileName;
               myNewAux.pictureData= response.data;
               this.setState({
                  myNew:myNewAux,
                  pictureDataB64: source,
               })
             }
     });
  }

  hanldeInput(text){

     let n = this.state.myNew;
     n.new = text;

     this.setState({
        myNew:n,
     })

  }

  handleLaunchImageLibrary(){
     ImagePicker.launchImageLibrary(options, (response) => {
           console.log('Response = ', response);

                 if (response.didCancel) {
                   console.log('User cancelled image picker');
                 } else if (response.error) {
                   console.log('ImagePicker Error: ', response.error);

                 } else {
                   const source = { uri: 'data:'+response.type+';base64,' + response.data };
                   
                     let myNewAux=this.state.myNew;                         
                         myNewAux.media_photos=response.fileName;
                         myNewAux.pictureData= response.data;
                         this.setState({
                             myNew:myNewAux,
                             pictureDataB64: source,
                         })
                 }
         });
  }



      handlePostData(){
          console.log(this.state.myNew);
          return fetch('http://192.168.1.69:8000/new/',
            {
              method:'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              body: JSON.stringify(this.state.myNew)
            }
          ).then((response) => response.json())
          .then((responseJson) => {
                console.log('succes');
                console.log(responseJson);
                return responseJson;
              })
              .catch((error) => {
              console.log('fail');
                console.error(error);
              });

      }

  render() {
    return (
      <View style={styles.container}>
           <CustomHeader title={''}/>
           <View>
               <View style={styles.containerTextInput}>
                  <TextInput  style={styles.textInputStyle} onChangeText={(text)=>this.hanldeInput(text)}/>
               </View>
               {
                 this.state.pictureDataB64!=null? <View style={styles.pictureViewerContainer}>
                                             <Image source={this.state.pictureDataB64} style={styles.pictureViewer} />
                                           </View>
                                         : <View></View>
               }

               <View style={styles.containerPictureIcons}>
                  <View style={styles.takePic}>
                       <Icon
                          name='camera'
                          type='font-awesome'
                          color='#517fa4'
                          onPress={()=>this.handleLaunchCamera()}
                       />
                  </View>
                  <View style={styles.galleryPic}>
                       <Icon
                       name='image'
                       type='font-awesome'
                       color='#517fa4'
                       onPress={()=>this.handleLaunchImageLibrary()}
                       />
                  </View>
               </View>
               <Button
                 onPress={()=>this.handlePostData()}
                   title="send"
               />
           </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    containerPictureIcons:{
        flexDirection: 'row',
        justifyContent:'flex-end',
    },
    textInputStyle:{
       width:'100%',
       height:'100%',
       borderColor: 'gray',
       borderWidth: 1,
    },
    pictureViewerContainer:{
       width:'20%',
       height:100,
    },
    pictureViewer:{
           width:'100%',
           height:'100%',
    },
    takePic:{
      padding:10
    },
    galleryPic:{
      padding:10
    },
    containerTextInput:{
      width:'100%',
      height:200,
      marginTop:20
    }
});
