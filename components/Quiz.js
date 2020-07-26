import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableHighlight,Dimensions} from  'react-native'
import QuizCard from './QuizCard'
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('screen')

class Quiz extends Component{
 
    render(){
        console.log("test",this.props.DeckId);
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>{this.props.deck.title} Quiz</Text>
                <QuizCard deck={this.props.deck} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: height/25,
    },
    heading:{
      fontSize:height/30,
      paddingBottom:height/20,
      textAlign:'center'
    },
    input:{ 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1 ,
      marginBottom:height/10
    },
    button:{
        backgroundColor:'#a8df65',
        padding:height/50,
        borderRadius:height/90,
        margin:height/40
    },
    text:{
        textAlign:'center'
    },
    button2:{
        backgroundColor:'#ee91bc',
        padding:height/50,
        borderRadius:height/90,
        margin:height/40
    },
})

function mapStateToProps(deck, {route}){
    const {DeckId} = route.params;
    return{
        deck: deck[DeckId],
    }
}

export default connect(mapStateToProps)(Quiz)