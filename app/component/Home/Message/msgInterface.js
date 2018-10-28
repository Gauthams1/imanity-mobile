import React, { Component } from 'react';
import { FlatList,View} from 'react-native';
import {connect} from 'react-redux'
import {Avatar,List,ListItem} from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io'

import { Text,Icon } from 'native-base';
class ListMsg extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.socket = io('https://imanity.herokuapp.com', {jsonp: false});
        }

  static navigationOptions = {
     tabBarIcon: () =>{ return ( <Icon style={{color:'#00E8FF'}} name="ios-chatboxes" /> )},
  };
  componentWillMount(){
    this.setState({message:(this.props.reducer1.Message)[this.props.reducer1.msginterface.information]});
  }

    componentWillUpdate() {
          if(this.props.reducer1.msginterface.inputavailable||((this.props.reducer1.Message)[this.props.reducer1.msginterface.information].length>this.state.message.length))
    {    this.setState((previousState) => {
      return {
        message: GiftedChat.prepend([],(this.props.reducer1.Message)[this.props.reducer1.msginterface.information]),
      };
    });
    //   this.setState({message:(this.props.reducer1.Message)[this.props.reducer1.msginterface.information]});
     this.props.informationRecieved("msginterface");
    }


    }
    getdatafromuser=(type)=>{
       if(!this.props.reducer1)
       this.forceUpdate();
       var details=this.props.reducer1.user.details;
       for (var i = 0; i < details.length; i++) {
         if(details[i].type==type)
         return details[i].data
       }
    }
    onSend(messages = []) {
      var sdata = { data: messages[0].text, user:this.props.reducer1.user._id, usrnm:this.props.reducer1.user.name, fromn:this.props.reducer1.user.username, to:this.props.reducer1.msginterface.information, from:this.props.reducer1.user.name, avatar:this.getdatafromuser("profpic") };
      this.socket.emit('msg',sdata);
      if(this.props.reducer1.msginterface.information!=this.props.reducer1.user.username)
      {var tempmsg2={_id:messages[0]._id, text:messages[0].text, createdAt: new Date(), user: { _id:1, name:this.props.reducer1.user.name,avatar:this.getdatafromuser("profpic"), }};
      this.props.Messageadd({name:this.props.reducer1.msginterface.information,data:tempmsg2});}
      this.setState((previousState) => {
        return {
          message: GiftedChat.append(previousState.message, messages),
        };
      });
    }
  render() {

       return (
         <GiftedChat
        messages={this.state.message}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
         );
 }
}
const mapStateToProps=(state)=>{
    return { reducer1:state.reducer1 };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    informationforward: (data)=>{
      dispatch({
        type:"informationforward",
        payload:data
      });
    },
    informationRecieved: (data)=>{
      dispatch({
        type:"informationRecieved",
        payload:data
      });
    },
    Messageadd: (data)=>{
      dispatch({
        type:"Messageadd",
        payload:data
      });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(ListMsg) ;
export default test ;
