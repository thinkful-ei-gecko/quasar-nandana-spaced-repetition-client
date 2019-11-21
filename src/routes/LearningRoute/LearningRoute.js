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
        <span className='word'>{!response.nextWord ? head.nextWord : response.nextWord}</span>
        <p className='hide-offset'>Your total score is: {!response.totalScore ? head.totalScore : response.totalScore}</p>
        <p className='hide-offset'>
          You have answered this word correctly {head.wordCorrectCount} times.
        </p>
        <p className='hide-offset'>
          You have answered this word incorrectly {head.wordIncorrectCount} times.
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
              maxLength={language.name === 'Morse Code' ? 1 : 100}
              autoFocus
              value={this.context.guess || ''}
              onChange={e => this.context.setGuess(e.target.value)}
              required
            />
            <Button type='submit' className='hide-offset-partial'>Submit your answer</Button>
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
        <h2>
          {response.isCorrect === true
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <div className='DisplayFeedback'>
          <span className='word'>{head.nextWord}</span>
          <p>
            The correct translation for {head.nextWord} was {response.answer}{' '}
            and you chose {this.context.guess}!
          </p>
        </div>
        <Button autoFocus onClick={this.handleNextWord}>
          Try another word!
        </Button>
        <div className='DisplayScore'>
          <p>Your total score is: {response.totalScore}</p>
        </div>
        {/*     <p>
          You have answered this word correctly {response.wordCorrectCount}{' '}
          times.
        </p>
        <p>
          You have answered this word incorrectly {response.wordIncorrectCount}{' '}
          times.
        </p> */}
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
