import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {connect} from 'react-redux'
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {StackNavigator} from 'react-navigation'
import { Container, Header, Content, Footer, FooterTab, Button,Item,Input,Fab, Icon,Title, Text,Left,Right,Body, Badge } from 'native-base';
var QuickActions = require('react-native-quick-actions');
import Maps from './maps'
import Assistance from './assistance'
import contactList from './contactlist'
import Opd from './opdBooking'





const Navigationobj = StackNavigator({
  Assistance:{screen:Assistance},
  Maps:{screen:Maps},
  contactList:{screen:contactList},
  Opd:{screen:Opd}
},{headerMode:'none'})

 class Home1 extends Component {
  constructor(props)
  {
    super(props);
    QuickActions.popInitialAction()
    .then((action) => {
      if(action){
      if(action.type=="Message")
          this.props.navigation.navigate("Message")
      }

    })
    .catch(console.error);

  }
  static navigationOptions = {
     tabBarIcon: () =>{ return ( <Icon style={{color:'#00E8FF'}} name="ios-home-outline" /> )},
  };

  render() {
       return (<Navigationobj />
   );
 }
}
const mapStateToProps=(state)=>{
  return { reducer:state.reducer1 };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    setname:(name)=>{
      dispatch({
        type:"add",
        payload:false
      })
    },
    getinfo:(name)=>{
      dispatch({
        type:"add",
        payload:false
      })
    }

  }
}
//const test = ;


export default connect(mapStateToProps,mapDispatchToProps)(Home1) ;
