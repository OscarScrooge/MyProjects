import React,{Component} from 'react';
import { Tooltip, Text,Icon } from 'react-native-elements';
import {View,StyleSheet} from 'react-native';

export default class NoteMenu extends Component{


     constructor(props){
        super(props)
     }


     render(){
       return(
          <View>
             <View style={styles.container}>
                 <Tooltip backgroundColor={'#FFFFFF'} popover={<Text >Eliminar</Text>} >
                   <Icon
                      name='ellipsis-h'
                      type='font-awesome'
                      color='#999999'

                   />
                 </Tooltip>
             </View>
          </View>
       )
     }
}



const styles = StyleSheet.create({
    container: {
            flex: 1,
            alignItems:'flex-end',
            marginRight:'5%',
            paddingTop:5,
        },

    toolTip:{
      backgroundColor:'#FFFFFF'
    }
})