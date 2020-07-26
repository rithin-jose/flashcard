import React,{Component} from 'react'
import {View,Text,Platform, StyleSheet} from 'react-native'
import Dashboard from './components/Dashboard'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Decks from './reducers'
import middleware from './middleware'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { setLocalNotification } from './utils/Notification'

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()
const Stack = createStackNavigator()

function Home() {
  return (
    <Tab.Navigator
    navigationOptions= {{
      header: null
    }}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="AddDeck" component={AddDeck} options={{title:"Add Deck"}}/>
    </Tab.Navigator>
  );
}
 
const store = createStore(Decks,middleware)


export default class App extends Component{
  componentDidMount(){
    setLocalNotification()
  }
  render(){
    return(
      <Provider store={store}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
            initialRouteName='Home'
            headerMode='screen'
            >
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
              <Stack.Screen name="ViewDeck" component={ViewDeck}  options={{title:"View Deck"}}/>
              <Stack.Screen name="AddCard" component={AddCard}  options={{title:"Add Card"}}/>
              <Stack.Screen name="Quiz" component={Quiz}  options={{title:"Quiz"}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})