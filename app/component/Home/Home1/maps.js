import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {connect} from 'react-redux'
import {
  StyleSheet,
  View
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon} from 'native-base';

class Maps extends Component {
 constructor(props)
 {
   super(props);
   this.state={
     a:true,
     active:true,
     initialregion:{
       latitude: 0,
       longitude: 0,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }
 }
 }

 getloc=()=>{

 }


 static navigationOptions = {
     title:"home"
 };
changescreen()
 {

 //  this.props.navigation.navigate("Assistance")
//this.props.setname(!this.props.reducer.isLoggedin)
 this.props.navigation.goBack();
 }
 componentDidMount(){
   navigator.geolocation.getCurrentPosition(
     (position) => {
       this.setState({initialregion:{
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }});
     },
     (error) => alert( error.message),
     { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000},
   );
   navigator.geolocation.watchPosition(
     (position) => {
       this.setState({initialregion:{
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
       }});
     },
     (error) => alert( error.message),
     { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000,distanceFilter: 1 },
   );
 }

 render() {
      return (
        <View style ={styles.container}>
        <MapView style ={styles.map}
          initialRegion={this.state.initialregion}
          region={this.state.initialregion}
        ><MapView.Marker coordinate={this.state.initialregion} />
        </MapView>
        <View style={{ flex: 1,}}>
        <ActionButton buttonColor="rgba(0,0,0,1)" onPress={this.changescreen.bind(this)} icon={<Icon style={{color:'#00E8FF'}} name="ios-home" />} >

        </ActionButton>
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
    setname: (name)=>{
      dispatch({
        type:"add",
        payload:name
      });
    }
  };
}
const test = connect(mapStateToProps,mapDispatchToProps)(Maps) ;

export default test ;
