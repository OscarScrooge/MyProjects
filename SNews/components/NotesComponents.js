import React,{Component} from 'react';
import {View,ScrollView,Image,Text} from 'react-native';

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
            <View style={{ textAlign:'center'}}>

                    <Image
                                    style={{
                                      width: 300,
                                      height: 100,
                                      textAlign:'center'
                                    }}
                                    source={{ uri: this.state.images.url}}
                                  />
                     <Text>
                     Bacon ipsum dolor amet pancetta beef ribs picanha alcatra hamburger andouille
                     </Text>
            </View>
        )

     }
}