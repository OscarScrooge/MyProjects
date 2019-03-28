import React,{Component} from 'react';
import { Avatar } from 'react-native-elements';


export default class CustomAvatar extends Component{

      constructor(props){
        super(props)
        this.state={
          picture:this.props.picure,
          size: this.props.size,
          avatar_source:this.props.avatar_source,
          showEditButton:this.props.showEditButton,
        }
      }

      render(){

         return(

            <Avatar
               size={this.props.size}
               rounded
               source={this.state.avatar_source}
               activeOpacity={0.7}
               showEditButton={this.state.showEditButton}
               onEditPress={()=>this.props.handleLaunchImageLibrary()}
            />
         )
      }
}