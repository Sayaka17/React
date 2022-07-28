import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png'
import Torahack from '../assets/img/hiyokara_w.png'

const Chat = (props) => {
    // true or falseを判定して返してくれるisQuestion　三項演算子
    const isQuestion = (props.type === 'question');
    // classをisQuestionによって🐸 flex-start or flex-end 左から吹き出しか、右から吹き出しか
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';

    return(
        <ListItem className={classes}>
          <ListItemAvatar>
            {isQuestion ? (
                <Avatar alt="icon" src={Torahack} />
            ):(
                <Avatar alt="icon" src={NoProfile} />
            )}
          </ListItemAvatar>
        <div className="p-chat__bubble">{props.text}</div>
        </ListItem>
    )
}

export default Chat