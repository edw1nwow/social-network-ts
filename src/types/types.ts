import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux/Redux-store";


export type ContactNames = 'facebook' | 'github' |"instagram" | "mainLink"| "twitter"|"vk" | "website" | "youtube"
export type PhotosType = {
    "small": string | null
    "large": string | null
}
export type ProfileType = {
    aboutMe: undefined | string
    contacts: {
        [key in ContactNames]: string | null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number
}
export type UserType = {
    id: number
    followed: boolean
    name: string
    status: string
    photos: PhotosType
    location: {
        city: string
        country: string
    }
}

export type ThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>