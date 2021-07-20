import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsTypes} from "./DialogsContainer";
import {DialogType, MessageType} from "../Redux/Dialogs-reducer";


const Dialogs = (props: DialogsPropsTypes) => {
    let dialogsElements = props.messagesPage.dialogs.map((el: DialogType) => <DialogItem name={el.name} id={el.id}/>)
    let messagesElements = props.messagesPage.messages.map((el: MessageType) => <Message message={el.message}/>)
    let MessageBody = props.messagesPage.newMessageText

    let newMessageBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let message = e.target.value;
        props.newMessageBody(message)
    }

    let onSendMessageClick = () => {
        props.onSendMessageClick()
    }

    return (
        <div className={s.Dialogs}>
            <div className={s.DialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.Messages}>
                {messagesElements}
                <div>
                    <div>
                        <textarea placeholder={'type your text'} value={MessageBody}
                                  onChange={newMessageBody}/>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dialogs;