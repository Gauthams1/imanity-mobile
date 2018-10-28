import React, { Component,DeviceEventEmitter } from 'react';
import {connect} from 'react-redux'
import {  View,  StyleSheet,  Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Item,Input,Icon,Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Avatar,CheckBox} from 'react-native-elements';
var Contacts = require('react-native-contacts');
var QuickActions = require('react-native-quick-actions');

class Assistance extends Component {
 constructor(props)
 {
   super(props);
   this.state={
     a:true,
     active:true,
     patientSelect:false,
     appshort:false
   }
//this.getloc();
QuickActions.popInitialAction()
.then((action) => {
  if(action){
    if(action.type=="Mayday")
    this.setState({appshort:true})
    }

})
.catch(console.error);

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
    if(!this.props.reducer1.user)
    ;
    else{
      var details=this.props.reducer1.user.details;
      for (var i = 0; i < details.length; i++) {
        if(details[i].type==type)
        return details[i].data
      }
    }

 }
 componentDidMount(){

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
    if(this.props.reducer1.tag&&this.state.appshort)
    {  this.mayday();this.setState({appshort:false});}
    }
selectpatient=()=>{
  if(this.state.patientSelect)
  return( <View style={{width:400,alignItems:'center'}}><Text style={{fontSize:17,color:'#000',fontWeight:'bold'}}>Select</Text>
            <Item  style={{margin:10,borderColor: 'gray', borderWidth: 2}}>
            <Input placeholder='Patient' value={this.state.info} onChangeText={(info) => this.setState({info})}  />
            <Icon active name='ios-contacts' onPress={this.changescreen.bind(this,"contactList")} />
            </Item></View>)
          }
mayday=()=>
{
  var tags=this.props.reducer1.tag;
  var medicaltag=false;
  console.log(tags);
for (var i = 0; i < tags.length; i++) {
  if(tags[i].name=="med")
  {
    medicaltag=tags[i];
    break;
  }
}
alert(JSON.stringify(medicaltag));

}
 render() {
      return (
        <View style ={styles.container}>
         <Grid>
          <Row style={{backgroundColor:'#fff',alignItems:'center',justifyContent:"center"}} size={1}>
          <Avatar
            rounded
            width={170}
            height={170}
            source={{uri: this.getdatafromuser("profpic")}}
            activeOpacity={0.7}
            />
          </Row>
          <Row style={{flex:2,flexDirection: 'column',alignItems:'center',backgroundColor:'#fff'}}>
          <CheckBox
            center
            title='Self'
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='check-box-outline-blank'
            checkedColor='red'
            checked={!this.state.patientSelect}
            onPress={()=>{this.setState({patientSelect:!this.state.patientSelect})}}
            containerStyle={{backgroundColor:'#0000'}}
          />
          {this.selectpatient()}
          <Text style={{fontSize:17,color:'#000',fontWeight:'bold'}}>Select</Text>
          <Item  style={{margin:10,borderColor: 'gray', borderWidth: 2}}>
          <Input disabled placeholder='Your' value={this.props.reducer1.user.name}  />
          </Item>
          <Item>
          <Button bordered info onPress={this.mayday.bind(this)}>
           <Text>         MayDay         </Text>
          </Button>
          </Item>
          </Row>
         </Grid>

            <ActionButton buttonColor="rgba(255,255,255,1)"  icon={<Icon style={{color:'#000'}} name="ios-add" />}>
            <ActionButton.Item buttonColor='#fff' title="Booking" onPress={this.changescreen.bind(this,"Opd")}>
            <Icon name="ios-create-outline" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#fff' title="Maps" onPress={this.changescreen.bind(this,"Maps")}>
            <Icon name="ios-map-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
            </ActionButton>

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
