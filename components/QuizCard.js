import React,{Component} from 'react'
import {View,Text,Dimensions,StyleSheet,TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('screen')


class QuizCard extends Component{
    componentDidMount(){
        const max= this.props.deck.questions.length
        const randomNumber = Math.floor((Math.random()*max ))
        this.setState({
            random:randomNumber
        })
    }

    state={
        answered:false,
        correctAnswer:false,
        index:0,
        random:0
    }
    
    handleTrue = () => {
        this.props.deck.questions[this.state.random].answer === this.props.deck.questions[this.state.index].answer
            ?
                this.setState({
                    answered:true,
                    correctAnswer: true
                })
            :
                this.setState({
                    answered:true,
                    correctAnswer: false
                })
    }

    handleFalse = () => {
        this.props.deck.questions[this.state.random].answer === this.props.deck.questions[this.state.index].answer
            ?
                this.setState({
                    answered:true,
                    correctAnswer: false
                })
            :
                this.setState({
                    answered:true,
                    correctAnswer: true
                })
    }

    handleNext = () => {
        console.log('p');
        this.setState({
            answered:false,
            correctAnswer:false,
            index:(this.state.index +1)
        })
    }



    render(){
        return(
            <View>
                {
                    this.state.index < this.props.deck.questions.length
                    ?
                        <View>
                            <Text>{this.props.deck.questions[this.state.index].question}</Text>
                        <Text>{this.props.deck.questions[this.state.random].answer}</Text>
                        {
                            this.state.answered
                            ?
                            <View>
                                {
                                    this.state.correctAnswer
                                    ?
                                    <View>
                                    <Text>Yes</Text>
                                    <TouchableHighlight style={styles.button} onPress={this.handleNext}>
                                        <Text style={styles.text}>next</Text>
                                    </TouchableHighlight>
                                    </View>
                                        :
                                        <View>
                                        <Text>No</Text>
                                        <TouchableHighlight style={styles.button} onPress={this.handleNext}>
                                            <Text style={styles.text}>next</Text>
                                        </TouchableHighlight>
                                        </View> 
                                }
                            </View>
                            :
                                <View style={styles.buttonContainer}>
                                    <TouchableHighlight style={styles.button} onPress={this.handleTrue}>
                                        <Text style={styles.text}>True</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.button2} onPress={this.handleFalse}>
                                        <Text style={styles.text}>False</Text>
                                    </TouchableHighlight>
                                </View>
                            }
                        </View>
                    :    
                        <View>
                            <Text>No More cards left</Text>
                            <Text>Hope you memorised everythin 😊</Text>
                        </View>
                }
                
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

// function mapStateToProps({deck,DeckId}){
//     return{
//         deck,
//         DeckId,
//     }
// }

export default connect()(QuizCard)