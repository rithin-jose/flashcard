import React,{Component} from 'react'
import {View,Text,TextInput,Dimensions,Keyboard,StyleSheet,TouchableHighlight} from 'react-native'
import {addDeckTitle} from '../actions'
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('screen')


class AddDeck extends Component{
  state={
    title:''
  }
  onChangeText = (text) => {
    this.setState({
      title:text,
    })
  }

  handleSubmit = (e) => {
    const {dispatch} = this.props
    const {title} = this.state
    e.preventDefault()
    this.setState({
      title:''
    })
    dispatch(addDeckTitle(title))
    .then(() => {
      this.props.navigation.goBack()
      Keyboard.dismiss()
    })
    //update database
    //update state
    //go back

  }
  render(){
    console.log(this.props)
    return(
      <View style={styles.container}>
        <Text style={styles.heading}>What is the Title of new Deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.title}
        />
        {
          this.state.title === '' 
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

export default connect()(AddDeck)