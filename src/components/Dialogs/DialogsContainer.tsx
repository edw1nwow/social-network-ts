import React from "react";
import s from './Dialogs.module.css'
import store from "../State/redux-store";
import {sendMessageAC, updateMessageAC} from "../State/Dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {
            (Store) => {
                let state = Store.getState().messagesPage

                let onMessageChange = (body: any) => {
                    store.dispatch(updateMessageAC(body))
                }

                let onSendMessageClick = () => {
                    store.dispatch(sendMessageAC())
                }

                return <div className={s.Dialogs}>
                    <Dialogs dialogsElements={state.dialogs}
                             messagesElements={state.messages}
                             newMessageBody={state.newMessageBody}
                             onNewMessageChange={onMessageChange}
                             onSendMessageClick={onSendMessageClick}/>
                </div>
            }
        }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;