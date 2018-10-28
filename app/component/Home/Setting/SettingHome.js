import React, { Component } from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux'
import {  Icon,Text,Toast} from 'native-base';
import {Avatar,List,ListItem} from 'react-native-elements';
class SettingsHome extends Component {
  constructor()
  {
    super();
    this.state={
      ListVar:[
  {
    name: 'Account Details',
    icon: 'account-box',
    sw1:false,
    nav:"Accounttab"
  },
  {
    name: 'Medical Details',
    icon: 'local-hospital',
    sw1:false,
    nav:"Medicaltab"
  },
  {
    name: 'Settings',
    icon: 'settings',
    sw1:false,
    nav:"Medicaltab"
  },
  {
    name: 'Contact Us',
    icon: 'bug-report',
    sw1:false,
    nav:"Contactus"
  },
  {
    name: 'Logout',
    icon: 'lock',
    sw1:false,
    nav:"logout"
  },

  ]
    }

  }
  static navigationOptions = {
     tabBarIcon: () =>{ return (<Icon style={{color:'#00E8FF'}} name="ios-settings-outline" />)},
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
  navigationclass=(item)=>{
    if(item=="logout")
    this.props.Logout();
    else {
      this.props.navigation.navigate(item)
    }
  }

 render() {
       return (
         <View style={{flex:1,backgroundColor:'#fff0'}}>
         <View style={{flex:1,backgroundColor:'#fff0',alignItems:'center',justifyContent:"center"}}>
         <Avatar
           rounded
           width={120}
           height={120}
           source={{uri: this.getdatafromuser("profpic")}}
           activeOpacity={0.7}
           />
           </View>
         <View style={{flex:3,backgroundColor:'#000'}}>
         <List containerStyle={{marginBottom: 20,backgroundColor:'#000',borderTopWidth: 0, borderBottomWidth: 0, borderBottomColor: "#000"}}>
                   <FlatList
          data={this.state.ListVar}
          renderItem={({item})=>(
            <ListItem
            roundAvatar
            containerStyle={{backgroundColor:'#0cc',marginBottom:0,marginRight:5,marginLeft:5,borderTopWidth:1, borderBottomColor: "#000", borderTopColor: "#000"}}
            titleStyle={{color:'#000'}}
          wrapperStyle={{backgroundColor: '#0cc'}}
             leftIcon={{name: item.icon,color:'#000'}}
             switchButton={item.sw1}
             onPress={this.navigationclass.bind(this,item.nav)}
             hideChevron={true}
                  title={item.name}
               />
          )}
          keyExtractor={(item)=>item.name}
          />
         </List>
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
    },Logout: ()=>{
      dispatch({
        type:"Logout"
    });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(SettingsHome) ;
export default test ;
