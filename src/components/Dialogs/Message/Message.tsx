import React from "react";
import s from './Message.module.css'



type MessageType = {
    message: string
}

const Message: React.FC<MessageType> = ({message}) => {

    return (
        <div className={s.Message}>
            {message}
        </div>)
}


export default Message;