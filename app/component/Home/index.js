
import React, { Component } from 'react';
import {TabNavigator,DrawerNavigator} from 'react-navigation'
import {Button,View} from 'react-native'
import Home1 from './Home1/Homeind'
import Message from './Message/Message'
import Settings from './Setting/Settings'


const Navigationclass = TabNavigator({
  Home:{screen:Home1},
    Message:{screen:Message},
  Settings:{screen:Settings}
},{tabBarPosition:'bottom',tabBarOptions: { activeTintColor: '#00ffff',showIcon:true,showLabel:false,indicatorStyle:{ backgroundColor:"#000"},activeBackgroundColor:'#000', labelStyle: { fontSize: 15, }, style: { backgroundColor: '#000' }, }})

class Notification extends Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',

  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}
  export default class Navig extends Component {
    render() {
         return (
           <View style={{flex:1}}>
           <Navigationclass  onNavigationStateChange={null} />
           </View>

     );
   }
  }
