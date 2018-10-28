import React, { Component } from 'react';
import { View,ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {  Icon,Text} from 'native-base';
import { List, ListItem ,Divider,Avatar} from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';

const list = [
  {
    name: 'Gautham',
    avatar_url: 'https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/10931343_791407594266773_8056036390050561699_n.jpg?oh=2088c51506c8738a7bede7ddeed26135&oe=5A7F5D97',
    subtitle: 'Founder',
    contentdetail:{
      Disc:"HI Guys,I am Gautham,lead programmer and Founder of this app",
      ContactEmail:"gautham20111@gmail.com",
      ContactNumber:"9496712157"
    }
  },
  {
    name: 'Sushant Samuel',
    avatar_url: 'https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/10383658_711015995635327_4358737881917941906_n.jpg?oh=e6aa1747e1c2766df6a1eeae47c969d7&oe=5A3B5F8F',
    subtitle: 'Founder',
    contentdetail:{
      Disc:" Mera Naam mukesh hai, college jata tha. \n Mainey sirf ek saal Gutka chabaya. \n Ab mujhe cancer hoya ….mera operation ho raha hai. \n Shayad mein eski baad bol nahi sakuga. \n Aur mein sirf 24 sal ka hoon. ",
      ContactEmail:"gautham20111@gmail.com",
      ContactNumber:"9496712157"
    }
  },
  {
    name: 'Saurav Goyal',
    avatar_url: 'https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-9/20431444_974469046029122_1025590660373987187_n.jpg?oh=88c65648d4396b19a0563723e2cd0674&oe=5A3FCF41',
    subtitle: 'Founder',
    contentdetail:{
      Disc:" Afsos ki baat hai ki Mukesh apne operation ke baad mar gaya \n koi na \n I am Saurav  ",
      ContactEmail:"gautham20111@gmail.com",
      ContactNumber:"9496712157"
    }
  }
]
class Contactus extends Component {
  constructor(props)
  {
    super(props);

  }
  static navigationOptions = {
     tabBarIcon: () =>{ return (<Icon style={{color:'#00E8FF'}} name="ios-settings" />)},
  };

  _renderHeader(section) {
  return (
    <View style={{flexDirection:'row',alignItems: 'center',marginBottom:1,padding:3,backgroundColor:'#fffe'}}>
    <Avatar
    medium
    rounded
    source={{uri:section.avatar_url}}
    activeOpacity={0.7}
    containerStyle={{marginLeft:10,marginRight:10}}
    />
    <View style={{flexDirection:'column'}}>
      <Text >{section.name}</Text>
      <Text note>{section.subtitle}</Text>
      </View>
    </View>
  );
}

_renderContent(section) {
  return (
    <View style={{backgroundColor:"#333",paddingLeft:10}}>
      <Text style={{color:'#fff'}}>{section.contentdetail.Disc}</Text>
      <Text style={{color:'#fff'}}>{section.contentdetail.ContactEmail}</Text>
      <Text style={{color:'#fff'}}>{section.contentdetail.ContactNumber}</Text>
    </View>
  );
}


 render() {
       return (
         <View style={{flex:1,backgroundColor:'#000'}}>
             <ScrollView>
        <View style={{zIndex:0}}>
          <Text style={{color:'#fff4'}}>
          ὄμνυμι Ἀπόλλωνα ἰητρὸν καὶ Ἀσκληπιὸν καὶ Ὑγείαν καὶ Πανάκειαν καὶ θεοὺς πάντας τε καὶ πάσας, ἵστορας ποιεύμενος, ἐπιτελέα ποιήσειν κατὰ δύναμιν καὶ κρίσιν ἐμὴν ὅρκον τόνδε καὶσυγγραφὴν τήνδε:
          ἡγήσεσθαι μὲν τὸν διδάξαντά με τὴν τέχνην ταύτην ἴσα γενέτῃσιν ἐμοῖς, καὶ βίου κοινώσεσθαι, καὶ χρεῶν χρηΐζοντι μετάδοσιν ποιήσεσθαι, καὶ γένος τὸ ἐξ αὐτοῦ ἀδελφοῖς ἴσον ἐπικρινεῖν ἄρρεσι, καὶ διδάξειν τὴν τέχνην ταύτην, ἢν χρηΐζωσι μανθάνειν, ἄνευ μισθοῦ καὶ συγγραφῆς, παραγγελίης τε καὶ ἀκροήσιος καὶ τῆς λοίπης ἁπάσης μαθήσιος μετάδοσιν ποιήσεσθαι υἱοῖς τε ἐμοῖς καὶ τοῖς τοῦ ἐμὲ διδάξαντος, καὶ μαθητῇσι συγγεγραμμένοις τε καὶ ὡρκισμένοις νόμῳ ἰητρικῷ, ἄλλῳ δὲ οὐδενί.
          διαιτήμασί τε χρήσομαι ἐπ᾽ ὠφελείῃ καμνόντων κατὰ δύναμιν καὶ κρίσιν ἐμήν, ἐπὶ δηλήσει δὲ καὶ ἀδικίῃ εἴρξειν.
          οὐ δώσω δὲ οὐδὲ φάρμακον οὐδενὶ αἰτηθεὶς θανάσιμον, οὐδὲ ὑφηγήσομαι συμβουλίην τοιήνδε: ὁμοίως δὲ οὐδὲ γυναικὶ πεσσὸν φθόριον δώσω.
          ἁγνῶς δὲ καὶ ὁσίως διατηρήσω βίοντὸν ἐμὸν καὶ τέχνην τὴν ἐμήν.
          οὐ τεμέω δὲ οὐδὲ μὴν λιθιῶντας, ἐκχωρήσω δὲ ἐργάτῃσιν ἀνδράσι πρήξιος τῆσδε.
          ἐς οἰκίας δὲ ὁκόσας ἂν ἐσίω, ἐσελεύσομαι ἐπ᾽ ὠφελείῃ καμνόντων, ἐκτὸς ἐὼν πάσης ἀδικίης ἑκουσίης καὶ φθορίης, τῆς τε ἄλλης καὶ ἀφροδισίων ἔργων ἐπί τε γυναικείων σωμάτων καὶ ἀνδρῴων, ἐλευθέρων τε καὶ δούλων.
          ἃ δ᾽ ἂν ἐνθεραπείῃ ἴδω ἢ ἀκούσω, ἢ καὶ ἄνευ θεραπείης κατὰ βίον ἀνθρώπων, ἃ μὴ χρή ποτε ἐκλαλεῖσθαι ἔξω, σιγήσομαι, ἄρρητα ἡγεύμενος εἶναι τὰ τοιαῦτα.
          ὅρκον μὲν οὖν μοι τόνδε ἐπιτελέα ποιέοντι, καὶ μὴ συγχέοντι, εἴη ἐπαύρασθαι καὶ βίου καὶ τέχνης δοξαζομένῳ παρὰ πᾶσιν ἀνθρώποις ἐς τὸν αἰεὶ χρόνον: παραβαίνοντι δὲ καὶ ἐπιορκέοντι, τἀναντία τούτων.
          </Text>
        </View>
        <View style={{flex:1,zIndex:10,width:400,position:'absolute'}}>
          <View style={{alignItems:'center'}}>
             <Text style={{fontSize: 20, fontWeight: 'bold',color:'#fff'}}>Our Team</Text>
          </View>
              <Divider />
              <Accordion
              sections={list}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              />
        </View>

          </ScrollView>
         </View>
   );
 }
}
// <List containerStyle={{marginBottom: 20}}>
//    {
//      list.map((l, i) => (
//        <ListItem
//          roundAvatar
//          avatar={{uri:l.avatar_url}}
//          key={i}
//          title={l.name}
//          subtitle={l.subtitle}
//          hideChevron={true}
//        />
//      ))
//    }
//  </List>
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
const test = connect(mapStateToProps,mapDispatchToProps)(Contactus) ;
export default test ;
