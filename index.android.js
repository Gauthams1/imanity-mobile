import React, { Component } from 'react';
import { AppRegistry,AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import Login from './app/component/login';
import HomePage from './app/component/Home';
import Loading from './app/component/loading';
import store from './app/store'
window.navigator.userAgent = 'react-native';
var QuickActions = require('react-native-quick-actions');

QuickActions.setShortcutItems([
  {
    type: "Mayday", // Required
    title: "Mayday alert", // Optional, if empty, `type` will be used instead
    subtitle: "Emergency Beacon",
    icon: "heartoutlined", // Pass any of UIApplicationShortcutIconType<name>
    userInfo: {
      url: "app://orders" // provide custom data, like in-app url you want to open
    }
  },
  {
    type: "Message", // Required
    title: "Message", // Optional, if empty, `type` will be used instead
    subtitle: "Message-someone",
    icon: "chatboxes", // Pass any of UIApplicationShortcutIconType<name>
    userInfo: {
      url: "app://orders" // provide custom data, like in-app url you want to open
    }
  }
]);

export default class Imanity extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      isLoading:true
    }
    setTimeout(this.getfetch,5);
    console.ignoredYellowBox = [
    'Setting a timer'
  ];
this.getfetch();
  }


handlep(data){
    this.setState({isLoggedIn:data})
    this.forceUpdate();
}
postfetch = (usname,passwd)=>{
  fetch('https://imanity.herokuapp.com/usersm/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: usname,
    password: passwd,
  })
  })
  AsyncStorage.setItem('username', usname);
  AsyncStorage.setItem('password', passwd);
}
datafetch=(username,password)=>{
var usname=username,passwd=password;
this.postfetch(usname,passwd)

}

getfetch=()=>
{ fetch('https://imanity.herokuapp.com/m', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => {
      AsyncStorage.getItem('username', (err, username) => {
        if(username!=null)
       { AsyncStorage.getItem('password', (err, password) => {
          if(response.user)
          {  this.state.isLoggedIn=true;
            store.dispatch({
              type:"adduser",
              payload:response.user
            })
            this.setState({isLoading:false})
          }
          else {

            this.datafetch(username,password);
            setTimeout(this.getfetch,50);
          }});}
          else {
            this.setState({isLoading:false})
          }
      });


   })

}
componentDidUpdate(){
}
  render() {
      if(this.state.isLoading)
    {
      return <Loading />
    }
    else {
      if (store.getState().reducer1.user)
      return    ( <Provider store={store}>
        <HomePage addproject={this.handlep.bind(this)} />
        </Provider>)

            else
          return   (<Provider store={store}><Login stat={this.state.isLoggedIn} loginup={this.handlep.bind(this)}/></Provider>)
    }
  }
}


AppRegistry.registerComponent('Imanity', () => Imanity);
