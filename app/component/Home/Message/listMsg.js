import React, { Component } from 'react';
import { FlatList,View} from 'react-native';
import {connect} from 'react-redux'
import {List,ListItem} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
class ListMsg extends Component {
  constructor(props) {
      super(props);
      this.state = {messages: []};
      this.onSend = this.onSend.bind(this);
    }
  static navigationOptions = {
     tabBarIcon: () =>{ return ( <Icon style={{color:'#00E8FF'}} name="ios-chatboxes-outline" /> )},
  };

    componentWillMount() {

    }
    onSend(messages = []) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages),
        };
      });
    }
    informationforward=(data)=>{
    this.props.informationforward(data);
    this.props.navigation.navigate("Msginterface")
    }
    listmsg = () =>{
      var a=Object.keys(this.props.reducer1.Message);
      var b=this.props.reducer1.Message
      return (
        <View style={{flex:1}}>
        <List >
        <FlatList
         data={a}
         renderItem={({item})=>{
           return(
           <ListItem
           roundAvatar
            avatar={{uri:(b[item])[0].user.avatar||"https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png"}}
                 title={item}
                 onPress={this.informationforward.bind(this,{info:item,to:"msginterface"})}

              />);}
         }
         keyExtractor={(item)=>item}
         />
        </List>
        <ActionButton buttonColor="rgba(255,255,255,1)"  icon={<Icon style={{color:'#000'}} name="ios-chatboxes-outline" />} onPress={()=>{this.props.navigation.navigate("FriendList")}}>
        </ActionButton>
        </View>
      )
    }

  render() {

       return (
         <View style={{flex:1}}>
         {this.listmsg()}
         </View>
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
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(ListMsg) ;
export default test ;
