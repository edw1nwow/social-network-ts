import {InferActionsType} from "./Redux-store";

let initialState = {
    dialogs: [
        {id: 1, name: 'Stas'},
        {id: 2, name: "Lera"},
        {id: 3, name: "vasya"},
        {id: 4, name: "kirill"}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are u"},
        {id: 3, message: "Bye"},
        {id: 4, message: "=D"}
    ] as Array<MessageType>,
    newMessageText: '' as string
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'SEND-NEW-MESSAGE-BODY': {
            let body = action.newMessageText
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }

        default:
            return state
    }
}

export const actions = {
    sendMessageAC: (newMessageText: string) => {
        return {type: "SEND-NEW-MESSAGE-BODY", newMessageText} as const
    }
}

export default dialogsReducer;

type ActionTypes = InferActionsType<typeof actions>

export type InitialStateType = typeof initialState

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}
