import React, {Component} from 'react';

const LangContext = React.createContext({
  language: {},
  error: null,
  words: [],
  setLanguage: () => {},
  setWords: () => {},
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

  render() {
    const value = {
      language: this.state.language,
      error: this.state.error,
      words: this.state.words,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
    };
    return (
      <LangContext.Provider value={value}>
        {this.props.children}
      </LangContext.Provider>
    );
  }
}
