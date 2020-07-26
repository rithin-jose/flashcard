import React,{Component} from 'react'
import {View,FlatList,ScrollView,StyleSheet,Dimensions} from 'react-native'
import DeckList from './DeckList'
import {handleInitialData} from '../actions'
import { connect } from 'react-redux'

const {height,width} = Dimensions.get('screen')

class Dashborard extends Component{

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    return(
      <ScrollView style={styles.container}>
        {this.props.deckId.map((deck)=> (
          <DeckList key={deck} id={deck} navigation={this.props.navigation} />
        ))}
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: height/25,
  }
})

function mapStateToProps(deck){
  return{
    deckId: Object.keys(deck),
  }
}

export default connect(mapStateToProps)(Dashborard)