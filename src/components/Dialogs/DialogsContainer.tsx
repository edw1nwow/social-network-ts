import {InitialStateType, sendMessageAC, updateMessageAC} from "../Redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateRedux} from "../Redux/Redux-store";
import { Dispatch } from "redux";

type MapStatePropsType = {
    messagesPage: InitialStateType
}

type MapDispatchPropsType = {
    newMessageBody: (body: string) => void,
    onSendMessageClick: () => void
}

export type DialogsPropsTypes = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {
        messagesPage: state.messagesPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType  => {
    return {
        newMessageBody: (body: string) => {
            dispatch(updateMessageAC(body))
        },
        onSendMessageClick: () => {
            dispatch(sendMessageAC())
        }
    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;