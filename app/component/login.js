/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Image,TextInput,TouchableOpacity,AsyncStorage} from 'react-native';
import { Container, Header, Content, Footer,Spinner,Form,Item,Label,Toast,Input, FooterTab, Button, Icon, Text, Badge,Root } from 'native-base';
import {connect} from 'react-redux'

class Login extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      pagelog:true,
      processing:false
        }
        setTimeout(this.getfetch,20);

  }
  datafetch=(username,password)=>{
  var usname=username,passwd=password;
  this.postfetch(usname,passwd)

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
      this.setState({processing:false})
  if(response.user)
    {this.state.isLoggedIn=true;
      this.props.adduser(response.user);
    }

    this.props.loginup(this.state.isLoggedIn);


   })


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
    AsyncStorage.setItem('contactsynced',"init");
  }



handlesubmit(e)
{ // e.preventDefault();
  this.setState({processing:true})
  this.datafetch(this.state.username,this.state.password);
  setTimeout(this.getfetch,50);
  if(!this.state.isLoggedIn)
  Toast.show({
        text: "Invalid Username or password",
        position: 'bottom',
        buttonText: 'Okay'
      })
}
Signup=(e)=>{  e.preventDefault();
  fetch('https://imanity.herokuapp.com/usersm/register', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: this.state.username,
    name: this.state.name,
    password: this.state.password,
    password2: this.state.cpassword,
    email:this.state.email
    })
  }).then(function(res){ return res.json(); }).then(function(data){
    if(data.status=="done")
    { this.setState({pagelog:true});

      }
      else {
        var error=data.errors;
        var totalerror=""
        for (var i = 0; i < error.length; i++) {
        totalerror+=error[i].msg+"\n"
        }
        Toast.show({
              text: totalerror,
              position: 'bottom',
              buttonText: 'Okay'
            })
       }
  }.bind(this))
}
processindicator=()=>{
  if(this.state.processing)
  return <Spinner color='#00ffff' />;
}
  render() {
  if(!this.state.isLoggedIn)
    { if(this.state.pagelog)
          { return (<Root>
              <Container style={{backgroundColor:'#00AFFF'}} >

                      <View style={{flex: 1, flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}} >
                      <View style={{flex: 5,alignItems: 'center',justifyContent: 'flex-end'}}>
                      <Image
                                style={{width: 100, height: 100}}
                                source={{uri: 'https://imanity.herokuapp.com/images/prj57-512x512.png'}}
                              />
                      </View>
                      {this.processindicator()}
                      <View style={{flex: 7,alignItems: 'center',width:350,marginTop:10,justifyContent: 'flex-start'}}>
                        <Item >
                          <Input placeholder="Username" ref="Username" style={{color:'#fff'}} returnKeyType="next"  onSubmitEditing={() =>{ this.refs.Password._root.focus();}} onChangeText={(username) => this.setState({username})} />
                        </Item>
                        <Item >
                          <Input secureTextEntry={true} placeholder="Password" style={{color:'#fff'}} returnKeyType="next" ref='Password' onChangeText={(password) => this.setState({password})}/>
                        </Item>
                          <Button rounded style={{marginTop:10}} block  onPress={this.handlesubmit.bind(this)}>
                          <Text>Sign in</Text>
                          </Button>

                          <TouchableOpacity style={{marginTop:20}} onPress={()=>{this.setState({pagelog:false})}}>
                          <Text>Sign Up?</Text>
                          </TouchableOpacity>

                      </View>
                      </View>

                  </Container>
                  </Root>
            );}
            else {
              return (<Root>
                <Container style={{backgroundColor:'#00AFFF'}} >
                        <View style={{flex: 1, flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}} >
                        <View style={{flex: 3,alignItems: 'center',justifyContent: 'flex-end'}}>
                        <Image
                                  style={{width: 100, height: 100}}
                                  source={{uri: 'https://imanity.herokuapp.com/images/prj57-512x512.png'}}
                                />
                        </View>
                        <View style={{flex: 6,alignItems: 'center',width:350,justifyContent: 'flex-start'}}>
                          <Item >
                            <Input placeholder="Name" ref="Name" style={{color:'#fff'}} returnKeyType="next"  onSubmitEditing={() =>{ this.refs.Username._root.focus();}} onChangeText={(name) => this.setState({name})} />
                          </Item>
                          <Item >
                            <Input placeholder="Username" ref="Username" style={{color:'#fff'}} returnKeyType="next"  onSubmitEditing={() =>{ this.refs.Email._root.focus();}} onChangeText={(username) => this.setState({username})} />
                          </Item>
                          <Item >
                            <Input placeholder="Email" ref="Email" style={{color:'#fff'}} returnKeyType="next"  onSubmitEditing={() =>{ this.refs.Password._root.focus();}} onChangeText={(email) => this.setState({email})} />
                          </Item>
                          <Item >
                            <Input secureTextEntry={true} placeholder="Password" style={{color:'#fff'}} returnKeyType="next" ref='Password' onSubmitEditing={() =>{ this.refs.CPassword._root.focus();}} onChangeText={(password) => this.setState({password})}/>
                          </Item>
                          <Item >
                            <Input secureTextEntry={true} placeholder="Conform Password" style={{color:'#fff'}} returnKeyType="next" ref='CPassword' onChangeText={(cpassword) => this.setState({cpassword})}/>
                          </Item>
                            <Button rounded style={{marginTop:10}} block  onPress={this.Signup.bind(this)}>
                            <Text>Sign Up</Text>
                            </Button>

                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{this.setState({pagelog:true});}}>
                            <Text>Sign In?</Text>
                            </TouchableOpacity>

                        </View>
                        </View>

                    </Container>
                    </Root>
                );
            }
    }
  }
}
const mapStateToProps=(state)=>{
  return { reducer:state.reducer };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    adduser:(user)=>{
      dispatch({
        type:"adduser",
        payload:user
      })
    }
  }
}
//const test = ;


export default connect(mapStateToProps,mapDispatchToProps)(Login) ;
