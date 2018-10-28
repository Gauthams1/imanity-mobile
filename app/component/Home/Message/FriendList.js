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
      var a=this.props.reducer1.friend;
      return (
        <View style={{flex:1}}>
        <List >
        <FlatList
         data={a}
         renderItem={({item})=>{
             return(
           <ListItem
                 title={item.data}
                 onPress={this.informationforward.bind(this,{info:item.data,to:"msginterface"})}

              />);}
         }
         keyExtractor={(item)=>item._id}
         />
        </List>

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
