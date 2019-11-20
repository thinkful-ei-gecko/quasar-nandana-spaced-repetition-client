import React, { Component } from 'react';
import LangService from '../../services/lang-service';
import LangContext from '../../contexts/LangContext';
import './LearningRoute.scss';

class LearningRoute extends Component {
  static contextType = LangContext;

  componentDidMount() {
    LangService.getHead().then(res => {
      this.context.setHead(res);
      this.context.setRenderWordForm(true);
      console.log(res);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    let { guess } = e.target;
    guess = guess.value;
    this.context.setGuess(guess);

    // post guess
    LangService.postGuess(guess).then(res => {
      this.context.setResponse(res);
      this.context.setRenderWordForm(false);
    });
  };

  handleButtonClick = event => {
    LangService.getHead().then(res => {
      this.context.setHead(res);
      this.context.setRenderWordForm(true);
      console.log(res);
    });
  };

  renderForm = () => {
    let head = this.context.head || {};
    return (
      <div>
        <form className='guess-form' onSubmit={this.handleSubmit}>
          <label htmlFor='learn-guess-input'>
            What's the translation for this word?
          </label>
          <input
            type='text'
            required
            id='learn-guess-input'
            name='guess'
          ></input>
          <button type='submit'>Submit your answer</button>
        </form>
        <p>Your total score is: {head.totalScore}</p>
        <p>
          You have answered this word correctly {head.wordCorrectCount} times.
        </p>
        <p>
          You have answered this word incorrectly {head.wordIncorrectCount}{' '}
          times.
        </p>
      </div>
    );
  };

  renderResponse = () => {
    let head = this.context.head || {};
    let response = this.context.response || {};
    console.log('***', this.context.response);
    return (
      <div>
        <h2>
          {response.isCorrect === true
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <div className='DisplayFeedback'>
          <p>
            The correct translation for {head.nextWord} was {response.answer}{' '}
            and you chose {this.context.guess} !
          </p>
        </div>
        <button onClick={this.handleButtonClick}>Try another word!</button>
        <p>Your total score is: {response.totalScore}</p>
        <p>
          You have answered this word correctly {response.wordCorrectCount}{' '}
          times.
        </p>
        <p>
          You have answered this word incorrectly {response.wordIncorrectCount}{' '}
          times.
        </p>
      </div>
    );
  };

  render() {
    let head = this.context.head || {};
    let isRenderWordForm = this.context.isRenderWordForm || null;
    let response = this.context.response || {};
    return (
      <section className='learningRoute-section'>
        <h2>Translate the word:</h2>
        <span className='word'>{head.nextWord}</span>
        {isRenderWordForm ? this.renderForm() : this.renderResponse()}
      </section>
    );
  }
}

export default LearningRoute;
