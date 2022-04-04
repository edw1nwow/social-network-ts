import {InitialStateType, sendMessageAC} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateRedux} from "../../redux/Redux-store";
import {Dispatch, compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import React from "react";

type MapStatePropsType = {
    messagesPage: InitialStateType
}
type MapDispatchPropsType = {
    onSendMessageClick: (newMessageText: string ) => void
}
export type DialogsPropsTypes = MapStatePropsType & MapDispatchPropsType


let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {
        messagesPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {

        onSendMessageClick: (newMessageText: string) => {
            dispatch(sendMessageAC(newMessageText))
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
