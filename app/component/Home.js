

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { StyleSheet, View, Image,StatusBar,AsyncStorage,Dimensions } from 'react-native';
 import { Container, Header, Content, Footer, FooterTab, Button,Item,Input, Icon,Title, Text,Left,Right,Body, Badge,Drawer } from 'native-base';
 import { List, ListItem } from 'react-native-elements'
 import {connect} from 'react-redux'
 import Navig from './Home/index.js';
  window.navigator.userAgent = 'react-native';
 import io from 'socket.io-client/dist/socket.io'

var width = Dimensions.get('window').width;

class HomePage extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      win:"Home",
      isOpen: false,

      }
        this.socket = io('https://imanity.herokuapp.com/', {jsonp: false});
        console.ignoredYellowBox = [
        'Setting a timer'
    ];



  }
  home(){
    this.state.page="Second";
  this.forceUpdate();
  }
  logout(){
   fetch('https://imanity.herokuapp.com/usersm/logout')
   this.state.isLoggedIn=false;
   AsyncStorage.removeItem('username');
   this.props.addproject(this.state.isLoggedIn);
   this.props.Logout();
    }
    componentDidUpdate(){
      if(this.props.reducer1.user&&!(this.state.user))
      this.setState({user:this.props.reducer1.user});
      else if(!(this.props.reducer1.user)&&this.state.user)
      {
        this.logout();
      }
      AsyncStorage.getItem('contactsynced',(err,data)=>{
        if(data=='init'){
          if(this.props.reducer1.cnos)
          {       fetch('https://imanity.herokuapp.com/usersm/phonefind', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
              data: JSON.stringify(this.props.reducer1.cnos)
              })
              })
              this.socket.emit('usermsg',{username:this.props.reducer1.user.username,id:this.props.reducer1.user._id});
              AsyncStorage.setItem('contactsynced',"completed");
              fetch('https://imanity.herokuapp.com/m', {
                    method: 'get',
                    dataType: 'json',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  }).then(response => response.json())
                  .then(response => {
                  this.props.adduser(response.user)
                 })}}})}
                 
  getfetch=(url)=>{
    fetch(this.props.reducer1.url+url).then(function(res){ return res.json(); }).then(function(data){
        this.props.DataAdd(data,url)
    }.bind(this))
  }
componentDidMount()
    {
            this.socket.on('msg-usr',(data)=>{
              var tempmsg2={ _id: data.id, text: data.data, createdAt: new Date(), user: { _id: this.props.reducer1.user.username==data.duname?1:2, name: data.duname==this.props.reducer1.user.username?data.uname:data.uname,avatar: data.avatar, }};
              this.props.Messageadd({name:data.duname,data:tempmsg2});
              });
            this.socket.on('usermsgr',(data)=>{
            var us1=data.u1;
            var tempmsg=[];
          for (var i = us1.length-1; i >=0 ; i--) {
              var tempmsg2={ _id: us1[i]._id, text: us1[i].data, createdAt: new Date(us1[i].crtd), user: { _id: this.props.reducer1.user.username==us1[i].Fromn?1:2, name: us1[i].Fromn, avatar: us1[i].avatar, }};
            if(!tempmsg[us1[i].Fromn==this.props.reducer1.user.username?us1[i].to:us1[i].Fromn])
              {
                tempmsg[us1[i].Fromn==this.props.reducer1.user.username?us1[i].to:us1[i].Fromn]=[]
              }
              tempmsg[us1[i].Fromn==this.props.reducer1.user.username?us1[i].to:us1[i].Fromn].push(tempmsg2);
            }
            this.props.MessageUp(tempmsg)
          });
          this.socket.on('laymsgr',(data)=>{
            var links=data.us;
            var friendlist=[];
            for (var i = 0; i < links.length; i++) {
              if(links[i].type=="friend")
              friendlist.push(links[i]);
            }
          this.props.DataAdd(friendlist,"friend")
           });
          this.socket.emit('usrid',this.props.reducer1.user.username);
          this.socket.emit('tagr',{id:this.props.reducer1.user._id,username:this.props.reducer1.user.username});
          this.socket.emit('recdett',{id:this.props.reducer1.user._id,username:this.props.reducer1.user.username})
          this.socket.emit('laymsgt',this.props.reducer1.user._id);
          this.socket.emit('usermsg',{username:this.props.reducer1.user.username,id:this.props.reducer1.user._id});
          this.getfetch("tag");
          }

  render() {

        return (

          <Container >
          <Header searchBar rounded style={{backgroundColor : '#000'}}>
            <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
                <Icon name="ios-people" />
              </Item>

           </Header>
           <View style={{flex:1,backgroundColor:'#fff7'}}>
           <Navig gpage={this.state.win} />
           </View>
        </Container>

    );

  }
}

const mapStateToProps=(state)=>{
  console.log("\n\n\n\n\n\n ----------");
  console.log(Object.keys(state.reducer1));
  return { reducer1:state.reducer1 };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    MessageUp: (message)=>{
      dispatch({
        type:"MessageUp",
        payload:message
      });
    },
    Messageadd: (data)=>{
      dispatch({
        type:"Messageadd",
        payload:data
      });
    },
    DataAdd: (data,name)=>{
      dispatch({
        type:"DataAdd",
        payload:{data:data,name:name}
      });
    },
    Logout: ()=>{
      dispatch({
        type:"Logout"
    });
  },
  adduser:(user)=>{
    dispatch({
      type:"adduser",
      payload:user
    })
  }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(HomePage) ;
export default test ;
