let initialState = {
    dialogs: [
        {id: "1s", name: 'Stas'},
        {id: "2s", name: "Lera"},
        {id: "3s", name: "vasya"},
        {id: "4s", name: "kirill"}
    ],
    messages: [
        {id: '1', message: "Hello"},
        {id: '2', message: "How are u"},
        {id: '3', message: "Bye"},
        {id: '4', message: "=D"}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body
            return state
        case 'SEND-NEW-MESSAGE-BODY':
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: '6', message: body})
            return state
        default:
            return state
    }

}
export const sendMessageAC = () => {
    return {type: "SEND-NEW-MESSAGE-BODY"} as const
}
export const updateMessageAC = (body: string) => {
    return {type: "UPDATE-NEW-MESSAGE-BODY", body: body} as const
}

export default dialogsReducer;