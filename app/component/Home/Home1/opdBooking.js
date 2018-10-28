import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Item,Input,Icon,Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Avatar} from 'react-native-elements';
var Contacts = require('react-native-contacts');
class Assistance extends Component {
 constructor(props)
 {
   super(props);
   this.state={
     a:true,
     active:true,
   }
//this.getloc();


 }


 getloc=()=>{
   navigator.geolocation.getCurrentPosition(
     (position) => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       });

       alert(this.state.latitude+"  "+this.state.longitude);
     },
     (error) => alert( error.message),
     { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 },
   );
 }


 static navigationOptions = {
  title:"assistance"
 };
changescreen(value)
 {

   this.props.navigation.navigate(value)
 //this.props.navigation.goBack();
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

componentDidUpdate()
{
if(this.props.reducer1.assistance)
 {
 if(this.props.reducer1.assistance.inputavailable)
{ var temp1={info:this.props.reducer1.assistance.information,};
 this.props.informationRecieved("assistance");
 this.setState(temp1);
}}
}
 render() {

      return (
        <View style ={styles.container}>
        <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:"center"}}>
        <Avatar
          rounded
          width={120}
          height={120}
          source={{uri: this.getdatafromuser("profpic")}}
          activeOpacity={0.7}
          />
          </View>
          <View style= {{flex:1,backgroundColor:'#fff',alignItems:'center'}}>

          </View>
        </View>
      );
}
}
const styles = StyleSheet.create({
  container: {
    flex:1
      },
  map: {
    ...StyleSheet.absoluteFillObject,

  },
});
const mapStateToProps=(state)=>{
  return { reducer1:state.reducer1 };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    informationRecieved: (data)=>{
      dispatch({
        type:"informationRecieved",
        payload:data
      });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(Assistance) ;
export default test ;
