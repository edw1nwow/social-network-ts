import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPropsTypes} from "./DialogsContainer";
import {DialogType, MessageType} from "../../redux/Dialogs-reducer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../Common/Textarea";
import {maxLengthCreator, required} from "../../utils/validator";

type AddMessageFormType = {
    newMessageText: string
}

const maxLength50 = maxLengthCreator(50)

const addMessageForm: React.FC<InjectedFormProps<AddMessageFormType>> = (props ) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} validate={[required, maxLength50]} name={'newMessageText'} placeholder={'type your text'} />
        <div>
            <button>send</button>
        </div>
    </form>)
}
const AddMessageFormRedux = reduxForm<AddMessageFormType>({form: "dialogAddMessageForm"})(addMessageForm)

const Dialogs = (props: DialogsPropsTypes) => {
    let dialogsElements = props.messagesPage.dialogs.map((el: DialogType) => <DialogItem key={el.id } name={el.name} id={el.id}/>)
    let messagesElements = props.messagesPage.messages.map((el: MessageType) => <Message key={el.id } message={el.message}/>)

    let addNewMessage = (values: AddMessageFormType) => {
        props.onSendMessageClick(values.newMessageText)
    }

    return (
        <div className={s.Dialogs}>
            <div className={s.DialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.Messages}>
                {messagesElements}
                <div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>

        </div>
    )
}


export default Dialogs;