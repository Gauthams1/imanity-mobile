import React, { Component } from 'react';
import {connect} from 'react-redux'
import {FlatList,View,StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Item,Input,Icon} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Avatar,List,ListItem} from 'react-native-elements';
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
if(!this.props.reducer1.contact)
this.getContact();

 }

changescreen()
 {

  // this.props.navigation.navigate("Home")
 this.props.navigation.goBack();
 }

 getContact=()=>{
   Contacts.getAll((err, contacts) => {
  if(err === 'denied'){
    // error
  } else {
    var cont=[];
    var phonenumber1=[]
    for (var i = 0; i < contacts.length; i++) {
      if(contacts[i].phoneNumbers.length>0)
      { var temp2=contacts[i].phoneNumbers;
        cont.push({name:contacts[i].givenName,ph:temp2,recordID:contacts[i].recordID,thumbnailPath:contacts[i].thumbnailPath})
        for (var j = 0; j < temp2.length; j++) {
          phonenumber1.push(temp2[j].number.replace("-","").replace(/ /g,"").slice(-10))
        }
      }
    }
    console.log(phonenumber1);
  this.props.dataadd(phonenumber1)
    this.setState({cont});
     if(!this.state.contactlist)
    this.contactalreadyavail();
  }}
  );
}
informationforward=(data)=>{
this.props.informationforward(data);
this.props.navigation.goBack(null);
}

listcontacts=()=>
{

  if(this.state.cont)
  return(
    <List containerStyle={{marginBottom: 20}}>
              <FlatList
     data={this.state.cont}
     renderItem={({item})=>(
       <ListItem
       roundAvatar
        avatar={{uri:item.thumbnailPath||"https://cdn2.lobster.media/assets/default_avatar-afa14913913cc117c73f1ac69496d74e.png"}}
             title={item.name}
            onPress={this.informationforward.bind(this,{info:item.name,to:"assistance"})}
          />
     )}
     keyExtractor={(item)=>item.recordID}
     />
    </List>
  )
}

contactalreadyavail=()=>{
if(!this.state.contactlist){
  if(!this.props.reducer1.contact)
  {
    var a = this.listcontacts();
  if(a)
   {
      this.setState({contactlist:a})
      this.props.contactforward(a)
  }
    }
  else {
  this.setState({contactlist:this.props.reducer1.contact});
  }

}
}

 render() {
      return (
        <View style ={styles.container}>

          {this.props.reducer1.contact}

          <ActionButton buttonColor="rgba(255,255,255,1)" onPress={this.changescreen.bind(this)} icon={<Icon style={{color:'#000'}} name="ios-arrow-back" />}>
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
    informationforward: (data)=>{
      dispatch({
        type:"informationforward",
        payload:data
      });
    },
    contactforward: (data)=>{
      dispatch({
        type:"contactadded",
        payload:data
      });
    },
    dataadd: (data)=>{
      dispatch({
        type:"DataAdd",
        payload:{name:"cnos",data:data}
      });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(Assistance) ;
export default test ;
