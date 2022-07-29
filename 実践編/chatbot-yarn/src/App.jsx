import React, { useState, useCallback, useEffect } from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';

// classなので直接export出来る
// クラスコンポーネント作成
// React.Componentを継承したクラスであるAppを宣言している
const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState(defaultDataset);
  const [open, setOpen] = useState(false);
  // 初期化する
  // this.selectAnswer = this.selectAnswer.bind(this)
  // this.handleClose = this.handleClose.bind(this)
  // this.handleClickOpen = this.handleClickOpen.bind(this)

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: dataset[nextQuestionId].question,
      type: 'question'
    })
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  // 回答が選択されたときの挙動
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500);
        break;
      case (/https:*/.test(nextQuestionId)):
        // aタグを作成
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blanc';
        a.click();
        break;
      case (nextQuestionId === "contact"):
        handleClickOpen()
        break;
      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  // 新しいチャットを追加するCallback関数
  const addChats = useCallback((chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }, [setChats]);

  const handleClickOpen = () => {
    setOpen(true)
  };

  // 子コンポーネントにpropsで値を渡しているから、callback関数を使用している。パフォーマンスを上げるために
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  // コンポーネントがマウント(配置)された直後に呼び出されるメソッド => ounting(マウント時)
  useEffect(() => {
    const initAnswer = "";
    selectAnswer(initAnswer, currentId);
  }, [])

  // コンポーネントが表示されて、Stateの更新を行う期間 => Updating
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });




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
  // render()ここで描画される（クラスコンポーネントのとき）
  // 関数コンポーネントはレンダーをつけなくてもいい
  return (
    <section className='c-section'>
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}


export default App