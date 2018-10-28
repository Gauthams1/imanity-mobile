import React, { Component } from 'react';
import {  AppRegistry,  View, Image,  ScrollView,  TextInput  } from 'react-native';
import { Container, Header, Content,Spinner, Footer,Form,Item,Label,Input, FooterTab, Button, Icon, Text, Badge } from 'native-base';

export default class Loading extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false
        }

  }

  render() {
  return (

<View style={{flex: 1,backgroundColor:'#000000',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
<View>
<Image
          style={{width: 100, height: 100}}
          source={{uri: 'https://imanity.herokuapp.com/images/prj57-512x512.png'}}
        />

</View>
<Text style={{color:'#00ffff',fontSize:40,fontFamily:'San Francisco'}}></Text>
<Spinner color='#00ffff' />
</View>

  );
  }
}
