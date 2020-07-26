import React,{Component} from 'react'
import {View,StyleSheet,Text,Dimensions,TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height,width} = Dimensions.get('screen')

class DeckList extends Component{
    render(){        
        return(
            <TouchableOpacity  onPress={() => this.props.navigation.navigate(
                'ViewDeck',
                {DeckId:this.props.id}
              )}
            >
                <View style={styles.container}>
                <Text style={styles.card}>{this.props.deckData.title} Deck</Text>
                <Text>{this.props.cardCount} Cards</Text>
               </View>
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(deck,{id}){
    const cardCount = deck[id].questions === undefined ? 0 : deck[id].questions.length
    return{
        deckData : deck[id],
        cardCount,
        id,
    }
}

const styles = StyleSheet.create({
    container:{
        height:height/6,
        backgroundColor:'#fff',
        borderRadius:height/80,
        marginBottom:height/40,
        alignItems:'center',
        justifyContent:'center'
    },
    card:{
        fontSize: height/40,
        fontWeight: "600"        
    }
})

export default connect(mapStateToProps)(DeckList)