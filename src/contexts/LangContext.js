import React, {Component} from 'react';

const LangContext = React.createContext({
  language: {},
  error: null,
  words: [],
  head:{},
  response:{},
  nextWord:'',
  wordCorrectCount:0,
  wordIncorrectCount:0,
  answer:'',
  totalScore:0,
  isRenderWordForm:true,
  guess:'',
  setLanguage: () => {},
  setWords: () => {},
  setHead:() =>{},
  setGuess:() =>{},
  setResponse:()=>{},
  setNextWord:()=>{},
  setWordCorrectCount:()=>{},
  setWordInCorrectCount:()=>{},
  setTotalScore:()=>{},
  setCorrectAnswer:()=>{},
  setRenderWordForm:()=>{}
});

export default LangContext;

export class LangProvider extends Component {
  constructor(props) {
    super(props);
    const state = {language: {}, error: null, words: []};
    this.state = state;
  }

  setLanguage = language => {
    this.setState({language}, console.log(this.state.language));
  };

  setWords = words => {
    this.setState({words});
  };

  setHead = head =>{
    this.setState({head});
  };

  setResponse = response =>{
    this.setState({response});
  };

  setGuess = guess => {
    this.setState({guess: guess.toUpperCase()})
  };

  setRenderWordForm = isRenderWordForm =>{
    this.setState({isRenderWordForm})
  }

  render() {
    const value = {
      language: this.state.language,
      error: this.state.error,
      words: this.state.words,
      head:this.state.head,
      guess:this.state.guess,
      response:this.state.response,
      isRenderWordForm:this.state.isRenderWordForm,
      
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setHead:this.setHead,
      setGuess:this.setGuess,
      setResponse:this.setResponse,
      setRenderWordForm:this.setRenderWordForm
    };
    return (
      <LangContext.Provider value={value}>
        {this.props.children}
      </LangContext.Provider>
    );
  }
}
