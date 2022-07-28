import React, { useState, useCallback, useEffect } from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';

// classなので直接export出来る
// クラスコンポーネント作成
// React.Componentを継承したクラスであるAppを宣言している
export default class App extends React.Component {
  // 初期化する
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push ({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  // 回答が選択されたときの挙動
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        this.displayNextQuestion(nextQuestionId)
        break;
      default:
        const chats = this.state.chats;
        chats.push ({
          text: selectedAnswer,
          type: 'answer'
        })

        this.setState({
          chats: chats
        })

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  }

// 中身を更新
componentDidMount() {
  const initAnswer = "";
  this.selectAnswer(initAnswer, this.state.currentId);
}

// anwersの中身にデータをセットするような関数
// initAnswer = () => {
//   const initDataset = this.state.dataset[this.state.currentId];
//   const initAnswers = initDataset.answers;
//   this.setState({
//     answers: initAnswers
//   })
// }


// chatの中身を更新
// initChats = () => {
//   const initDataset = this.state.dataset[this.state.currentId]
//   const chat = {
//     text: initDataset.question,
//     type: 'question'
//   }
//   const chats = this.state.chats;
//   chats.push(chat)
//   this.setState({
//     chats: chats
//   })
// }


// render()の中にreturn()で、jsxをreturnする. ライフサイクルやstateを持つ
// answers = this.state.ansersは、コンストラクタで初期化したやつ。
// answersに値が入ったら、AnswersListのpropsに値が入る
render(){
  return (
    <section className='c-section'>
      <div className="c-box">
        <Chats chats={this.state.chats} />
        <AnswersList answers={this.state.answers}  select = {this.selectAnswer}/>
      </div>
    </section>
  );
}
}

