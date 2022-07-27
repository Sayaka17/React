import React from 'react'
import {Answer} from './index'

// 関数コンポーネント
const AnswersList = () => {
    return(
        <div className="c-grid_answer">
            <Answer />
            <Answer />
            <Answer />
            <Answer />
        </div>
    )
}

export default AnswersList