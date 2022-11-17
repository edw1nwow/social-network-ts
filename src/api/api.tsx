import axios from "axios";
import {UserType} from "../types/types";


export enum ResultCodesEnum {
    Succes = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
items: Array<UserType>
    totalCount: number
    error: string | null
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '997cf28c-7511-4fb0-92c4-c47f5b41d1a1'
    }
});


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    message: Array<string>
    resultCode: RC
}