import {actions, InitialStateType} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/Redux-store";
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


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messagesPage: state.messagesPage,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {

        onSendMessageClick: (newMessageText: string) => {
            dispatch(actions.sendMessageAC(newMessageText))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
