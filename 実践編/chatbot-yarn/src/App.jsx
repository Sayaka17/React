import React, {useState, useCallback, useEffect} from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css'
import { AnswersList } from './components/index';

// classなので直接export出来る
// クラスコンポーネント作成
// React.Componentを継承したクラスであるAppを宣言している
export default class App extends React.Component {
  // 初期化する
  constructor(props) {
    super(props)
    this.state = {
      answers:[],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }
  // render()の中にreturn()で、jsxをreturnする. ライフサイクルやstateを持つ
  render(){
  return(
    <section className='c-section'>
      <div className="c-box">
        <AnswersList/>
      </div>
    </section>
  );
}
}

