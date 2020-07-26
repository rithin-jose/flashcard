import React,{Component} from 'react'
import {View,Text,TextInput,Dimensions,StyleSheet,TouchableHighlight} from 'react-native'
import {addCardToDeck} from '../actions'
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('screen')


class AddCard extends Component{
  state={
    question: '',
    answer: ''
  }
  onChangeQuestion = (question) => {
    this.setState({
      question,
    })
  }
  onChangeAnswer = (answer) => {
    this.setState({
      answer,
    })
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    const {question,answer} = this.state
    const questions = {
      question:question,
      answer:answer
    }
    e.preventDefault()
    this.setState({
        question: '',
        answer: ''
    })
    console.log("fin",this.props.DeckId);
    dispatch(addCardToDeck(this.props.DeckId,questions))
    .then(() => this.props.navigation.goBack())
    //update database
    //update state
    //go back

  }
  render(){
    console.log("re",this.props.DeckId)
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>New Card</Text>
        <Text>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={question => this.onChangeQuestion(question)}
          value={this.state.question}
        />
        <Text>Answer</Text>
        <TextInput
          style={styles.input}
          onChangeText={answer => this.onChangeAnswer(answer)}
          value={this.state.answer}
        />
        {
          this.state.question === '' || this.state.answer === ''
          ?
            <TouchableHighlight  style={styles.disabled} onPress={()=>  alert("No title entred")}>
              <Text>Create Deck</Text>
            </TouchableHighlight>

          :
            <TouchableHighlight  style={styles.enabled} onPress={this.handleSubmit}>
              <Text>Create Deck</Text>
            </TouchableHighlight>
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
  disabled:{
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  enabled:{
    alignItems: "center",
    backgroundColor: "#a8df65",
    padding: 10
  }
})


// function mapDispatchToProps({},{navigation}) {

//   return {
//       goBack: () => navigation.goBack()
//   }
// }

function mapStateToProps({},{route}){
  const {DeckId} = route.params;
  return{
    DeckId,
  }
}

export default connect(mapStateToProps)(AddCard)