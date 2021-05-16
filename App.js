import React from 'react';
import {Image} from 'react-native'
import ProductUpdateScreen from './screens/ProductUpdateScreen'
import NotificationScreen from './screens/NotificationScreen'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import loginScreen from './screens/loginScreen'


export default class App extends React.Component{
  render(){
    return (
      <AppContainer />
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  ProductUpdateScreen:{screen:ProductUpdateScreen,
  navigationOptions : {
    tabBarIcon:<Image source={require('./assets/add.jpg')} style={{width:40,height:40}} />,
    tabBarLabel:'Add Product'
  }},
    NotificationScreen:{screen:NotificationScreen,
      navigationOptions : {
        tabBarIcon:<Image source={require('./assets/request-list.png')} style={{width:40,height:40}} />,
        tabBarLabel:'Requested Orders'
      }},
})
const SwitchNavigator = createSwitchNavigator({
  loginScreen:{screen:loginScreen},
  TabNavigator:{screen:TabNavigator}
})
const AppContainer = createAppContainer(SwitchNavigator)