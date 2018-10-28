/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button,Item,Input, Icon,Title, Text,Left,Right,Body, Badge } from 'native-base';

import Login from './app/component/login';
import HomePage from './app/component/Home';
import Loading from './app/component/loading';

export default class Imanity extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      isLoading:true
    }
  //  this.getfetch();
  }
handlep(data){
  this.state.isLoggedIn=data;
    this.forceUpdate();
}
getfetch=()=>
{  fetch('https://imanity.herokuapp.com/m', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => {
      AsyncStorage.getItem('username', (err, result) => {
    console.log("result"+result);
  });
  console.log("hello from here");
    if(response.user)
    {  this.state.isLoggedIn=true;
    }
  //  this.setState({isLoading:false});
   })
}
  render() {
    if(this.state.isLoading)
    {
      return <Loading />
    }
    else {
      if (this.state.isLoggedIn)
      return    <HomePage />
      else
          return   <Login stat={this.state.isLoggedIn} addproject={this.handlep.bind(this)}/>
    }
  }
}


AppRegistry.registerComponent('Imanity', () => Imanity);
