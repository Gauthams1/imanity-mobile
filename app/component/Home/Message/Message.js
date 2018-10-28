import {StackNavigator} from 'react-navigation';
import ListMsg from './listMsg';
import Msginterface from './msgInterface'
import FriendList from './FriendList'

const Navigationobj = StackNavigator({
  ListMsg:{screen:ListMsg},
  Msginterface:{screen:Msginterface},
  FriendList:{screen:FriendList}
},{headerMode:'none'})

export default Navigationobj;
