import React, { Component } from 'react';
import LangService from '../../services/lang-service';
import LangContext from '../../contexts/LangContext';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './DashboardRoute.scss';

class DashboardRoute extends Component {
  static contextType = LangContext;

  componentDidMount() {
    LangService.getLang().then(res => {
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
      console.log(res.language.name);
      console.log(res);
    });
  }

  render() {
    let langName = this.context.language.name || '';
    let totalScore = this.context.language.total_score || 0;
    let words = this.context.words || [];
    console.log(words);
    let wordCards = words.map(word => {
      return (
        <li className='word-info-card' key={word.id}>
          <div className='incorrect-count' data-count={word.incorrect_count}>
            <p data-count={word.incorrect_count}>
              incorrect answer count: {word.incorrect_count}
            </p>
          </div>
          <div className='word'>
            <p>{word.translation}</p>
            <h4>{word.original}</h4>
          </div>
          <div className='correct-count'>
            <p data-count={word.correct_count}>
              correct answer count: {word.correct_count}
            </p>
          </div>
        </li>
      );
    });

    return (
      <section className='dashboard-section'>
        <h2>{langName}</h2>
        <Link to='/learn' className='practice-link'>
          Start practicing
        </Link>
        <div className='dashboard-header'>
          <h3>Words to practice</h3>
          <h4>Total correct answers: {totalScore}</h4>
        </div>
        <div className='word-list'>{wordCards}</div>
      </section>
    );
  }
}

export default DashboardRoute;
