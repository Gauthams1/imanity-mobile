import React, { Component } from 'react';
import { View,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {  Icon,Text,Item,Input,Badge,Button} from 'native-base';
class MedicalDetails extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tag:false,
      medtag:false
    }

  }
  static navigationOptions = {
     tabBarIcon: () =>{ return (<Icon style={{color:'#00E8FF'}} name="ios-settings" />)},
  };
  badgeremover=(index)=>{
    this.state.medtag.data.splice(index, 1);
    this.forceUpdate();
  }
  badgeupdate=(type)=>{
    this.state.medtag.data.push({data:this.state.input,type:type});
    this.forceUpdate();
  }
  badgeadder=(type)=>{
  console.log(this.state.medtag.data);
  if(this.state.medtag)
  return(
    <View style={{flexDirection: 'row'}}>
    {
    this.state.medtag.data.map((l, i) => {
        if(l.type==type)
       return <Badge textStyle={{ color: 'white' }} key={l.type+"#"+i}  style={{flexDirection:'row',backgroundColor:'#5555'}} ><Text>{l.data}</Text><TouchableOpacity onPress={this.badgeremover.bind(this,i)} ><Text style={{fontSize:10,fontWeight:'bold'}}>✕</Text></TouchableOpacity></Badge>
    })
    }
     </View>
  )
}
medtagadder=()=>{
  fetch('https://imanity.herokuapp.com/usersm/tagbulk', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name:"med",data:JSON.stringify(this.state.medtag.data),tocall:this.props.reducer1.user.username,type:"mt1"})
})
}
 render() {

   if(this.props.reducer1.tag&&!this.state.tag)
   {this.setState({tag:this.props.reducer1.tag})
   }
   if(!this.state.medtag)
   {
     for (var i = 0; i < this.state.tag.length; i++) {
       if(this.state.tag[i].type=="mt1")
       this.setState({medtag:this.state.tag[i]})
     }
   }
//
       return (
         <View style={{flex:1}}>
         <Text style={{fontSize: 25, fontWeight: 'bold'}}>allergies</Text>
         {this.badgeadder("allergies")}
         <Item>
              <Input placeholder="allergies" onChangeText={(input) => this.setState({input})} onSubmitEditing={()=>{this.badgeupdate("allergies");}} />
         </Item>
         <Text style={{fontSize: 25, fontWeight: 'bold'}}>Emergency Contact</Text>
         {this.badgeadder("emco")}
         <Item>
              <Input placeholder="Emergency Contact" onChangeText={(input) => this.setState({input})} onSubmitEditing={()=>{this.badgeupdate("emco");}}/>
         </Item>
         <Text style={{fontSize: 25, fontWeight: 'bold'}}>Habbit</Text>
         {this.badgeadder("habbit")}
         <Item>
              <Input placeholder="Habbit" onChangeText={(input) => this.setState({input})} onSubmitEditing={()=>{this.badgeupdate("habbit");}} />
         </Item>
         <Text style={{fontSize: 25, fontWeight: 'bold'}}>Additional</Text>
         {this.badgeadder("additional")}
         <Item>
              <Input placeholder="Additional" onChangeText={(input) => this.setState({input})} onSubmitEditing={()=>{this.badgeupdate("additional");}} />
         </Item>
         <Button block dark onPress={this.medtagadder.bind(this)}>
         <Text>Submit</Text>
         </Button>
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
const test = connect(mapStateToProps,mapDispatchToProps)(MedicalDetails) ;
export default test ;
