import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import Store from "../State/redux-store";
import {sendMessageAC, updateMessageAC} from "../State/Dialogs-reducer";


const Dialogs = () => {

    let dialogsElements = Store.getState().messagesPage.dialogs.map(el => <DialogItem name={el.name} id={el.id}/>);
    let messagesElements = Store.getState().messagesPage.messages.map(el => <Message message={el.message}/>);
    let newMessageBody = Store.getState().messagesPage.newMessageBody;

    let onNewMessageChange = (e: any) => {
        let body = e.target.value;
        Store.dispatch(updateMessageAC(body))
        console.log(Store.getState().messagesPage)
    }

    let onSendMessageClick = () => {
        Store.dispatch(sendMessageAC())
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