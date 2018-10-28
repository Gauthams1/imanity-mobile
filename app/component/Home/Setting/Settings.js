import React, { Component } from 'react';
import { View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Medicaltab from './MedicalDetails'
import Accounttab from './AccountDetails'
import Contactus from './Contactus'
import SettingHome from './SettingHome'
const Navigationobj = StackNavigator({
  SettingHome:{screen:SettingHome},
  Medicaltab:{screen:Medicaltab},
  Contactus:{screen:Contactus},
  Accounttab:{screen:Accounttab}
},{headerMode:'none'})

export default Navigationobj;
