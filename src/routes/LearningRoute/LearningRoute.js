import React, { Component } from 'react'
import LangService from '../../services/lang-service'
import LangContext from '../../contexts/LangContext'
import './LearningRoute.scss'

class LearningRoute extends Component {
  static contextType = LangContext;

  componentDidMount() {
    LangService.getHead().then(res => {
      
      this.context.setHead(res);
      // this.context.setNextWord({nextWord:res.nextWord})
      // this.context.setWordCorrectCount({wordCorrectCount:res.wordCorrectCount})
      // this.context.setWordInCorrectCount({wordInCorrectCount:res.wordInCorrectCount})
      // this.context.setTotalScore({totalScore:res.totalScore})
      this.context.setIsRender(true)
      console.log(res)
    });
  }
  handleSubmit = e =>{
    e.preventDefault();
    let {guess} = e.target;
    guess = guess.value;
    console.log('+++++++',guess)
    this.context.setGuess(guess)
    console.log('after setting context',this.context.guess)
    LangService.postGuess(guess).then(res=>{
      guess = '';
      this.context.setResponse(res)
      // this.context.setNextWord({nextWord:res.nextWord})
      // this.context.setWordCorrectCount({wordCorrectCount:res.wordCorrectCount})
      // this.context.setWordInCorrectCount({wordInCorrectCount:res.wordInCorrectCount})
      // this.context.setTotalScore({totalScore:res.totalScore})
      this.context.setIsRender(false)
      console.log(res)
      console.log(this.context.isRender)
    })

  }

  handleButtonClick = event => {
    
    this.context.setIsRender(true)
    
  };

  renderForm = () =>{
    let head = this.context.head || {};
    return(
      <div>
       <form className="guess-form"  onSubmit={this.handleSubmit}>
         <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
         <input type='text' required id='learn-guess-input' name='guess'></input>
          <button type='submit'>Submit your answer</button>
       </form>
        <p>Your total score is: {head.totalScore}</p>
        <p>You have answered this word correctly {head.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {head.wordIncorrectCount} times.</p>
      </div> 
    )
  }

  renderResponse = () =>{
    
    let head = this.context.head || {};
    let response =this.context.response || {};
    console.log('***',this.context.response)
    return(
      <div>
        <h2>
          {response.isCorrect === true
            ? 'You were correct! :D'
            : 'Good try, but not quite right :('}
        </h2>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {head.nextWord} was{' '}
            {response.answer} and you chose {this.context.guess} !
          </p>
        </div>
        <button onClick={this.handleButtonClick}>Try another word!</button>
        <p>Your total score is: {response.totalScore}</p>
        <p>You have answered this word correctly {response.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {response.wordIncorrectCount} times.</p>
      </div>
    )
  }

  render() {
    let head = this.context.head || {};
    let isRender = this.context.isRender || null;
    let response =this.context.response || {};
    console.log(isRender)
    return (
      <section className="learningRoute-section">
        <h2>Translate the word:</h2>
        <span className='word'>{head.nextWord}</span>
        {(isRender) ? this.renderForm() :this.renderResponse()}
        
        
      </section>
    );
  }
}

export default LearningRoute
