import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {Action, Dispatch} from "redux";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from 'redux-thunk'
import {AppStateType, InferActionsType} from "./Redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


let initialState = {
    id: null as number | null,
    email: null as null | string,
    login: null as null | string,
    isAuth: false as boolean,
    captchaUrl: null as null | string

}


const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'network/auth/SET-USER-DATA':
        case 'network/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (id: null | number, email: null | string, login: null | string, isAuth: boolean) => {
        return {type: 'network/auth/SET-USER-DATA', payload: {id, email, login, isAuth}} as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {type: 'network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const
    }
}


export const getAuthUserData = (): ThunkType<ActionTypes> => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Succes) {
        let {id, login, email} = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType<FormAction | ActionTypes> => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Succes) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.message.length > 0 ? data.message[0] : 'Common error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionTypes>) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = () => async (dispatch: Dispatch<ActionTypes>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Succes) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

type ActionTypes = InferActionsType<typeof actions>

type ThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>

type InitialStateType =  typeof initialState