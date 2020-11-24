import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import Store from "../State/State";


const Dialogs = () => {

    let dialogsElements = Store._state.messagesPage.dialogs.map(el => <DialogItem name={el.name} id={el.id} />);
    let messagesElements = Store._state.messagesPage.messages.map(el => <Message message={el.message} />);

    return (
        <div className={s.Dialogs}>
            <div className={s.DialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.Messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;