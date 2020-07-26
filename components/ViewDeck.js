import React,{Component} from 'react'
import {View,Text,TouchableHighlight,StyleSheet,Dimensions} from 'react-native'
import { connect } from 'react-redux'

const {height,width} = Dimensions.get('screen')


class ViewDeck extends Component{
    render(){
        console.log("eah",this.props.DeckId)
        return(
            <View style={styles.container}>
                <Text style={styles.card}>{this.props.deck.title} Deck</Text>
                <Text>{this.props.cardCount} Cards</Text>
                <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate(
                    'AddCard',
                    {DeckId:this.props.DeckId}
                )}>
                    <Text>Add Card</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    {DeckId:this.props.DeckId}
                )}>
                    <Text>Start Quiz</Text>
                </TouchableHighlight>
                {/* <TouchableHighlight>
                    <Text style={styles.text}>Delete Deck</Text>
                </TouchableHighlight> */}
                </View>
            </View>
        )
    }
  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:height/20,
        alignItems:'center'
    },
    card:{
        fontSize: height/40,
        fontWeight: "600"        
    },
    button:{
        backgroundColor:'#a8df65',
        padding:height/50,
        borderRadius:height/90,
        margin:height/40
    },
    buttonContainer:{
        marginTop:height/5,
        alignItems:'center'
    },
    text:{
        color:'#ff0000',
    }
})

function mapStateToProps(deck, {route}) {
    const {DeckId} = route.params;
    const cardCount = deck[DeckId].questions === undefined ? 0 : deck[DeckId].questions.length
    console.log(route);
    return ({
            deck:deck[DeckId],
            cardCount,
            DeckId,
        }
    )
}

export default connect(mapStateToProps)(ViewDeck)