import React from "react";
import s from './Dialogs.module.css'
import store from "../State/redux-store";
import {sendMessageAC, updateMessageAC} from "../State/Dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = () => {

    let state = store.getState().messagesPage
    console.log(state)
    let onMessageChange = (body: any) => {
        store.dispatch(updateMessageAC(body))
    }

    let onSendMessageClick = () => {
        store.dispatch(sendMessageAC())
    }

    return (
        <div className={s.Dialogs}>
            <Dialogs dialogsElements={state.dialogs} messagesElements={state.messages}
                     newMessageBody={state.newMessageBody} onNewMessageChange={onMessageChange}
                     onSendMessageClick={onSendMessageClick} />

        </div>
    )
}

export default DialogsContainer;