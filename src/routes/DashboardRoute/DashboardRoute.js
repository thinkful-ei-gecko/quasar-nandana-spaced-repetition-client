import React, {Component} from 'react';
import LangService from '../../services/lang-service';
import LangContext from '../../contexts/LangContext';
import WordInfo from '../../components/WordInfo/WordInfo';
import './DashboardRoute.scss';

class DashboardRoute extends Component {
  static contextType = LangContext;

  componentDidMount() {
    LangService.getLang().then(res => {
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
      console.log(res.language.name);
    });
  }

  render() {
    let langName = this.context.language.name || '';
    let totalScore = this.context.language.score || 0;
    let words = this.context.words || [];
    console.log(words);
    let wordCards = words.map(word => {
      return (
        <div className="word-info-card">
          <div className="incorrect-count">
            <p>{word.incorrect_count}</p>
          </div>
          <div className="word">
            <p>{word.translation}</p>
            <p>{word.original}</p>
          </div>
          <div className="correct-count-score">{word.correct_count}</div>
        </div>
      );
    });

    return (
      <section>
        <h2>{langName}</h2>
        <h3>{totalScore}</h3>
        <div className="word-list">{wordCards}</div>
      </section>
    );
  }
}

export default DashboardRoute;
