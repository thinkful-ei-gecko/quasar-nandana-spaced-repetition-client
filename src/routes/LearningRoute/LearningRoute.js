import React, { Component } from 'react';
import LangService from '../../services/lang-service';
import LangContext from '../../contexts/LangContext';
import { Label, Input } from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import './LearningRoute.scss';

class LearningRoute extends Component {
  static contextType = LangContext;

  state = {
    renderForm: true
  };

  componentDidMount() {
    this.handleNextWord();
    LangService.getLang().then(res => {
      this.context.setLanguage(res.language);
    });
  }

  handleSubmitGuess = e => {
    e.preventDefault();
    LangService.postGuess(this.context.guess).then(res => {
      this.context.setResponse(res);
      this.setState({ renderForm: false });
    });
  };

  /*   handleAlternateSubmitGuess = (e) => {
    this.context.setGuess(e.target.value);
    this.handleSubmitGuess();
  } */

  handleNextWord = () => {
    LangService.getHead().then(res => {
      this.context.setHead(res);
      this.setState({ renderForm: true });
      this.context.setGuess('');
    });
  };

  renderForm = () => {
    let head = this.context.head || {};
    let response = this.context.response || {};
    let language = this.context.language || {};
    // if (language.name == null) return null;

    return (
      <>
        <h2 className='hide-offset'>Translate the word:</h2>
        <div className='scoreboard'>
          <div className='incorrect-count'>
            <h4>{head.wordIncorrectCount}</h4>
          </div>
          <div className='totalscore'>
            <h3>{head.totalScore}</h3>
          </div>
          <div className='correct-count'>
            <h4>{head.wordCorrectCount}</h4>
          </div>
        </div>
        <span className='word'>
          {!response.nextWord ? head.nextWord : response.nextWord}
        </span>
        <p className='hide-offset'>
          Your total score is:{' '}
          {!response.totalScore ? head.totalScore : response.totalScore}
        </p>
        <p className='hide-offset'>
          You have answered this word correctly {head.wordCorrectCount} times.
        </p>
        <p className='hide-offset'>
          You have answered this word incorrectly {head.wordIncorrectCount}{' '}
          times.
        </p>
        <form className='guess-form' onSubmit={e => this.handleSubmitGuess(e)}>
          <fieldset>
            <Label htmlFor='learn-guess-input'>
              What's the translation for this word?
            </Label>
            <Input
              type='text'
              id='learn-guess-input'
              name='guess'
              maxLength={
                language.name == null
                  ? 100
                  : language.name === 'Morse Code'
                  ? 1
                  : 100
              }
              autoFocus
              value={this.context.guess || ''}
              onChange={e =>
                this.context.setGuess(
                  language.name == null
                    ? e.target.value
                    : language.name === 'Morse Code'
                    ? e.target.value.toUpperCase()
                    : e.target.value
                )
              }
              required
            />
            <Button type='submit' className='hide-offset-partial'>
              Submit your answer
            </Button>
          </fieldset>
        </form>
      </>
    );
  };

  renderResponse = () => {
    let head = this.context.head || {};
    let response = this.context.response || {};
    return (
      <>
        <h2 className='hide-offset'>
          {response.isCorrect === true
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <div className='DisplayScore hide-offset'>
          <p>Your total score is: {response.totalScore}</p>
        </div>
        <div className='scoreboard'>
          <div className='incorrect-count'>
            <h4>
              {response.isCorrect
                ? head.wordIncorrectCount
                : head.wordIncorrectCount + 1}
            </h4>
          </div>
          <div className='totalscore'>
            <h3>{response.totalScore}</h3>
          </div>
          <div className='correct-count'>
            <h4>
              {response.isCorrect
                ? head.wordCorrectCount + 1
                : head.wordCorrectCount}
            </h4>
          </div>
        </div>
        <span className='word word-response' data-decoded={response.answer}>
          {head.nextWord}
        </span>
        <div className='DisplayFeedback hide-offset'>
          <p>
            The correct translation for {head.nextWord} was {response.answer}{' '}
            and you chose {this.context.guess}!
          </p>
        </div>
        <Button
          autoFocus
          onClick={this.handleNextWord}
          className={
            response.isCorrect
              ? 'correct-button next-button'
              : 'wrong-button next-button'
          }
        >
          Try another word!
        </Button>
      </>
    );
  };

  render() {
    let renderForm = this.state.renderForm;

    return (
      <section className='learningRoute-section'>
        {renderForm ? this.renderForm() : this.renderResponse()}
      </section>
    );
  }
}

export default LearningRoute;
