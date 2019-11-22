import React, { Component } from 'react';

const LangContext = React.createContext({
  language: {},
  error: null,
  words: [],
  head: {},
  response: {},
  guess: '',
  setLanguage: () => {},
  setWords: () => {},
  setHead: () => {},
  setGuess: () => {},
  setResponse: () => {}
});

export default LangContext;

export class LangProvider extends Component {
  constructor(props) {
    super(props);
    const state = { language: {}, error: null, words: [] };
    this.state = state;
  }

  setLanguage = language => {
    this.setState({ language });
  };

  setWords = words => {
    this.setState({ words });
  };

  setHead = head => {
    this.setState({ head });
  };

  setResponse = response => {
    this.setState({ response });
  };

  setGuess = guess => {
    // guess = this.state.head.language.name === 'Morse Code' ? guess.toUpperCase() : guess;
    this.setState({ guess });
  };

  render() {
    const value = {
      language: this.state.language,
      error: this.state.error,
      words: this.state.words,
      head: this.state.head,
      guess: this.state.guess,
      response: this.state.response,

      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setHead: this.setHead,
      setGuess: this.setGuess,
      setResponse: this.setResponse
    };
    return (
      <LangContext.Provider value={value}>
        {this.props.children}
      </LangContext.Provider>
    );
  }
}
