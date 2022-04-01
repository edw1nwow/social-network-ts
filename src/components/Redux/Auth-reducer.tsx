import {authAPI} from "../Api/Api";
import {Dispatch} from "redux";


let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth:false
}

type InitialStateType = {
    id: null | number
    email: null | string
    login:  null | string
    isFetching: null | boolean
    isAuth: boolean
}

const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

type setUserDataActionType = ReturnType<typeof setAuthUserData>

type ActionTypes = setUserDataActionType

export const setAuthUserData = (id: number, email:string, login:string) => {
    return {type: "SET-USER-DATA", data: {id, email, login}} as const
}
export const getAuthUserData = () => (dispatch:Dispatch<setUserDataActionType>) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login))
        }
    })

}

export default authReducer;