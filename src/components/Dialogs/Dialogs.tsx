import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


export type DialogsPropsType = {
    dialogsElements: any
    messagesElements: any
    newMessageBody: any
    onNewMessageChange: (e: any) => void
    onSendMessageClick: () => void
}


const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogsElements.map((el: any) => <DialogItem name={el.name} id={el.id}/>)
    let messagesElements = props.messagesElements.map((el: any) => <Message message={el.message}/>)
    let newMessageBody = props.newMessageBody

    let onNewMessageChange = (e: any) => {
        let body = e.target.value;
        props.onNewMessageChange(body)
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
                        <textarea placeholder={'type your text'} value={newMessageBody}
                                  onChange={onNewMessageChange}/>
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