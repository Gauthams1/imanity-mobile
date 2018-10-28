import React, { Component } from 'react';
import { View} from 'react-native';
import {connect} from 'react-redux'
import {  Icon,Input,Item,Label} from 'native-base';
import {Avatar,List,ListItem} from 'react-native-elements';
class AccountTab extends Component {
  constructor(props)
  {
    super(props);

  }
  static navigationOptions = {
     tabBarIcon: () =>{ return (<Icon style={{color:'#00E8FF'}} name="ios-settings" />)},
  };
  getdatafromuser=(type)=>{
     if(!this.props.reducer1)
     this.forceUpdate();
     else if(!this.props.reducer1.user)
     ;
     else
     {var details=this.props.reducer1.user.details;
     for (var i = 0; i < details.length; i++) {
       if(details[i].type==type)
       return details[i].data
     }}
  }
 render() {
       return (
         <View style={{flex:1, flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
         <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
         <Avatar
           rounded
           width={120}
           height={120}
           source={{uri: this.getdatafromuser("profpic")}}
           activeOpacity={0.7}
           />
           </View>
           <View style={{flex:3,alignItems:'center',justifyContent: 'flex-start'}}>
           <Item floatingLabel>
           <Label style={{paddingVertical:10}}>Username</Label>
              <Input disabled placeholder="Username" value={this.props.reducer1.user.username} />
            </Item>
            <Item floatingLabel >
            <Label style={{paddingVertical:10}}>Name</Label>
              <Input disabled placeholder="name" value={this.props.reducer1.user.name} />
            </Item>
            <Item floatingLabel >
            <Label style={{paddingVertical:10}}>Email</Label>
              <Input disabled placeholder="email" value={this.props.reducer1.user.email}/>
            </Item>


           </View>

         </View>
   );
 }
}
const mapStateToProps=(state)=>{
      return { reducer1:state.reducer1 };
}
const mapDispatchToProps=(dispatch)=>{
  return {
    informationforward: (data)=>{
      dispatch({
        type:"test",
        payload:data
      });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(AccountTab) ;
export default test ;
