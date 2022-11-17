import {getAuthUserData} from "./Auth-reducer"
import {ThunkDispatch} from "redux-thunk"
import {AppStateType, InferActionsType} from "./Redux-store"


let initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/SET-INITIALIZED':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


type ActionTypes = InferActionsType<typeof actions>

export const actions = {
    initializedSuccess: () => {
        return {type: "SN/APP/SET-INITIALIZED"} as const
    }
}


export const initializeApp = () => (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })

}

export default appReducer;