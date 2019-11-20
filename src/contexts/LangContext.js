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
  isRender:true,
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
  setIsRender:()=>{}
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
    this.setState({guess})
  };
  setNextWord = nextWord => {
    this.setState({nextWord})
  }
  setWordCorrectCount = wordCorrectCount=> {
    this.setState({wordCorrectCount})
  }
  setWordInCorrectCount = wordInCorrectCount=> {
    this.setState({wordInCorrectCount})
  }
  setTotalScore = totalScore => {
    this.setState({totalScore})
  }
  setIsRender = isRender =>{
    this.setState({isRender})
  }

  render() {
    const value = {
      language: this.state.language,
      error: this.state.error,
      words: this.state.words,
      head:this.state.head,
      guess:this.state.guess,
      response:this.state.response,
      // nextWord:this.state.nextWord,
      // wordCorrectCount:this.state.wordCorrectCount,
      // wordInCorrectCount:this.state.wordInCorrectCount,
      // totalScore:this.state.totalScore,
      isRender:this.state.isRender,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setHead:this.setHead,
      setResponse:this.setResponse,
      // setNextWord:this.setNextWord,
      // setWordCorrectCount:this.setWordCorrectCount,
      // setWordInCorrectCount:this.setWordInCorrectCount,
      // setTotalScore:this.setTotalScore,
      setGuess:this.setGuess,
      setIsRender:this.setIsRender
    };
    return (
      <LangContext.Provider value={value}>
        {this.props.children}
      </LangContext.Provider>
    );
  }
}
