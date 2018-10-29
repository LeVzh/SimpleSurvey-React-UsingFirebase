import React, { Component } from 'react';
import './App.css';
var uuid = require("uuid");
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAaGNISPTjeBoCpYRd5IaQthqSYSyxR0Wc",
  authDomain: "simplesurvey-7092e.firebaseapp.com",
  databaseURL: "https://simplesurvey-7092e.firebaseio.com",
  projectId: "simplesurvey-7092e",
  storageBucket: "simplesurvey-7092e.appspot.com",
  messagingSenderId: "966315532136"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: uuid.v1(),
      name: '',
      answers: {
        q1: '',
        q2: '',
        q3: '',
        q4: '',
      },
      submitted: false
    }
  }

  handleNameSubmit(e) {
    var name = this.refs.name.value;
    this.setState({name:name}, function() {
      console.log(this.state)
    });
    
    e.preventDefault();
  }

  handleQuestionSubmit(e){
    
    firebase.database().ref('surveys/'+this.state.id).set({
      name: this.state.name,
      answers: this.state.answers
    })

    this.setState({submitted:true}, () => {
      console.log("questions submitted..")
    })
    e.preventDefault();
  }

  handleQuestionChange(e) {
    let answers = this.state.answers;

    if(e.target.name === 'q1') {
      answers.q1 = e.target.value;
    }else if(e.target.name === 'q2') {
      answers.q2 = e.target.value;
    }else if(e.target.name === 'q3') {
      answers.q3 = e.target.value;
    }else if(e.target.name === 'q4') {
      answers.q4 = e.target.value;
    }

    this.setState({answers:answers}, ()=>{
      console.log(this.state)
    })
  }

  render() {

    var user;
    var questions;

    if(this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>
      questions = <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>
          <div>
            <label>What is your favorite operating system?</label><br/>
            <input type="radio" name="q1" onChange={this.handleQuestionChange.bind(this)} value="Windows" />Windows <br/>
            <input type="radio" name="q1" onChange={this.handleQuestionChange.bind(this)} value="Osx" />Osx <br/>
            <input type="radio" name="q1" onChange={this.handleQuestionChange.bind(this)} value="Linux" />Linux <br/>
            <input type="radio" name="q1" onChange={this.handleQuestionChange.bind(this)} value="Solaris" />Solaris <br/>
            <input type="radio" name="q1" onChange={this.handleQuestionChange.bind(this)} value="Other" />Other <br/>
          </div>
          <div>
            <label>What is your favorite brand of TV</label><br/>
            <input type="radio" name="q2" onChange={this.handleQuestionChange.bind(this)} value="Sony" />Sony <br/>
            <input type="radio" name="q2" onChange={this.handleQuestionChange.bind(this)} value="Samsung" />Samsung <br/>
            <input type="radio" name="q2" onChange={this.handleQuestionChange.bind(this)} value="Green" />Green <br/>
            <input type="radio" name="q2" onChange={this.handleQuestionChange.bind(this)} value="Visio" />Visio <br/>
            <input type="radio" name="q2" onChange={this.handleQuestionChange.bind(this)} value="Other" />Other <br/>
          </div>
          <div>
            <label>What is your favorite smartphone brand?</label><br/>
            <input type="radio" name="q3" onChange={this.handleQuestionChange.bind(this)} value="Apple" />Apple <br/>
            <input type="radio" name="q3" onChange={this.handleQuestionChange.bind(this)} value="Samsung" />Samsung <br/>
            <input type="radio" name="q3" onChange={this.handleQuestionChange.bind(this)} value="Nexus" />Nexus <br/>
            <input type="radio" name="q3" onChange={this.handleQuestionChange.bind(this)} value="Blackberry" />Blackberry <br/>
            <input type="radio" name="q3" onChange={this.handleQuestionChange.bind(this)} value="Other" />Other <br/>
          </div>
          <div>
            <label>What is your favorite CPU brand?</label><br/>
            <input type="radio" name="q4" onChange={this.handleQuestionChange.bind(this)} value="Intel" />Intel <br/>
            <input type="radio" name="q4" onChange={this.handleQuestionChange.bind(this)} value="AMD" />AMD <br/>
            <input type="radio" name="q4" onChange={this.handleQuestionChange.bind(this)} value="Nvidia" />Nvidia <br/>
            <input type="radio" name="q4" onChange={this.handleQuestionChange.bind(this)} value="ARM" />ARM <br/>
            <input type="radio" name="q4" onChange={this.handleQuestionChange.bind(this)} value="Other" />Other <br/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </span>
    } else if (!this.state.name && this.state.submitted === false) {
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type='text' placeholder='enter name...' ref='name' />
        </form>
      </span>
      questions = '';
    } else if (this.state.submitted === true) {
        user = <h2>Thank You {this.state.name}</h2>
    }

    return (
      <div className="">
        <header className="App-header text-center">
          <h2>Simple survey</h2>
        </header>
        <div className="text-center">
          {user}
        </div>
        <div className="container">
           {questions}
        </div>
      </div>
    );
  }
}

export default App;
