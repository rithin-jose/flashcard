import React,{Component} from 'react'
import {View,Text,Dimensions,StyleSheet,TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import {clearLocalNotification,setLocalNotification} from '../utils/Notification'

const {height,width} = Dimensions.get('screen')


class QuizCard extends Component{
    componentDidMount(){
        const max= this.props.deck.questions.length
        const randomNumber = Math.floor((Math.random()*max ))
        this.setState({
            random:randomNumber
        })
        clearLocalNotification()
        .then(setLocalNotification)
    }

    state={
        answered:false,
        correctAnswer:false,
        index:0,
        random:0,
        count:0,
        showAnswer:false
    }
    
    handleTrue = () => {
        this.props.deck.questions[this.state.random].answer === this.props.deck.questions[this.state.index].answer
            ?
                this.setState({
                    answered:true,
                    correctAnswer: true,
                    count:(this.state.count +1)
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
                    correctAnswer: true,
                    count:(this.state.count +1)
                })
    }

    handleNext = () => {
        console.log('p');
        this.setState({
            answered:false,
            correctAnswer:false,
            index:(this.state.index +1),
            showAnswer:false
        })
    }

    reset =() => { 
        this.setState({
            answered:false,
            correctAnswer:false,
            index:0,
            random:0,
            count:0
        })
    }
    showAnswer = () =>{
        this.setState({
            showAnswer:true
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
                                    {
                                        this.state.showAnswer
                                        ?
                                        <View>
                                        <Text style={styles.answer}>Answer</Text>
                                            <Text >{this.props.deck.questions[this.state.index].answer}</Text>
                                        </View>
                                        :
                                        <View></View>
                                    }

                                    <TouchableHighlight style={styles.button3} onPress={this.showAnswer}>
                                        <Text style={styles.text}>Show Answer</Text>
                                    </TouchableHighlight>
                                    </View>
                                        :
                                        <View>
                                        <Text>No</Text>
                                        <TouchableHighlight style={styles.button} onPress={this.handleNext}>
                                            <Text style={styles.text}>next</Text>
                                        </TouchableHighlight>
                                        {
                                        this.state.showAnswer
                                        ?
                                        <View>
                                        <Text style={styles.answer}>Answer</Text>
                                            <Text >{this.props.deck.questions[this.state.index].answer}</Text>
                                        </View>
                                        :
                                        <View></View>
                                    }
                                        <TouchableHighlight style={styles.button3} onPress={this.showAnswer}>
                                            <Text style={styles.text}>Show Answer</Text>
                                        </TouchableHighlight>
                                        </View> 
                                }
                            </View>
                            :
                                <View style={styles.buttonContainer}>
                                    {
                                        this.state.showAnswer
                                        ?
                                        <View >
                                            <Text style={styles.answer}>Answer</Text>
                                            <Text >{this.props.deck.questions[this.state.index].answer}</Text>
                                            <TouchableHighlight style={styles.button} onPress={this.handleNext}>
                                                <Text style={styles.text}>next</Text>
                                            </TouchableHighlight>
                                        </View> 
                                        :
                                        <View>
                                            <TouchableHighlight style={styles.button} onPress={this.handleTrue}>
                                                <Text style={styles.text}>True</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.button2} onPress={this.handleFalse}>
                                                <Text style={styles.text}>False</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.button3} onPress={this.showAnswer}>
                                                <Text style={styles.text}>Show Answer</Text>
                                            </TouchableHighlight>
                                        </View>
                                    }
                                    
                                </View>
                            }
                        </View>
                    :    
                        <View>
                            <Text>No More cards left</Text>
                            <Text>Hope you memorised everythin 😊</Text>
                            <Text>No of correct answers = {this.state.count}</Text>
                            <TouchableHighlight style={styles.button} onPress={this.reset}>
                                        <Text style={styles.text}>Start Again</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.goBack()}>
                                        <Text style={styles.text}>Go Back</Text>
                            </TouchableHighlight>
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
    button3:{
        backgroundColor:'#edf492',
        padding:height/50,
        borderRadius:height/90,
        margin:height/40
    },
    answer:{
        textAlign:'center',
        fontWeight:'600',
        marginTop: height/10
    }
})

// function mapStateToProps({deck,DeckId}){
//     return{
//         deck,
//         DeckId,
//     }
// }

export default connect()(QuizCard)