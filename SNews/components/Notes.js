import React,{Component} from 'react';
import {View,ScrollView,Image,Text} from 'react-native';
import NotesComponents from './NotesComponents';
export default class extends Component{

     constructor(props){
         super(props);
         this.state={
           images:this.props.images,
         }
         console.log(this.state);
     }

     render(){
        return(
            <View>
            <ScrollView>
            {
             this.state.images.map(
                (item,index)=>
                  <NotesComponents key={index} images={item}/>
             )
            }
            </ScrollView>
            </View>
        )

     }
}