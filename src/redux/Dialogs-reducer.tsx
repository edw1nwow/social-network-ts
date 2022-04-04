export type DialogType = {
    id: string
    name: string
}
export type MessageType = {
    id: string
    message: string
}


let initialState = {
    dialogs: [
        {id: "1s", name: 'Stas'},
        {id: "2s", name: "Lera"},
        {id: "3s", name: "vasya"},
        {id: "4s", name: "kirill"}
    ] as Array<DialogType>,
    messages: [
        {id: '1', message: "Hello"},
        {id: '2', message: "How are u"},
        {id: '3', message: "Bye"},
        {id: '4', message: "=D"}
    ] as Array<MessageType>,
    newMessageText: '' as string

}

export type InitialStateType = typeof initialState

const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'SEND-NEW-MESSAGE-BODY': {
            let body = action.newMessageText
            return {
                ...state,
                messages: [...state.messages, {id: '6', message: body}]
            }
        }

        default:
            return state
    }
}

type sendMessageActionType = ReturnType<typeof sendMessageAC>


type ActionTypes =  sendMessageActionType



export const sendMessageAC = (newMessageText: string) => {
    return {type: "SEND-NEW-MESSAGE-BODY", newMessageText} as const
}


export default dialogsReducer;