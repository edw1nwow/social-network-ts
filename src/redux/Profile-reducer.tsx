import {Dispatch} from "redux";
import {AppStateType, InferActionsType} from "./Redux-store";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, ProfileType, ThunkType} from "../types/types";
import {profileAPI} from "../api/profile-api";


let initialState = {
    posts: [
        {id: 1, likesCount: 1, message: 'Hello'},
        {id: 2, likesCount: 2, message: 'Dima '},
        {id: 3, likesCount: 3, message: 'kak tu'},
        {id: 4, likesCount: 4, message: 'Nope'}
    ] as Array<PostsType>,
    profile: null as ProfileType | null ,
    status: "" as string

}

const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case 'DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            debugger
                return {
                    ...state, profile: {...state.profile, photos: action.photos} as ProfileType
                }
        }
        default:
            return state;

    }
}

export const actions = {
    addPost: (newPostText: string) => {
        return {type: 'ADD-POST', newPostText} as const
    },
    deletePost: (postId: number) => {
        return {type: 'DELETE_POST', postId} as const
    },
    setStatus: (status: string) => {
        return {type: 'SET_STATUS', status} as const
    },
    setUserProfil: (profile: ProfileType) => {
        return {type: 'SET_USER_PROFILE', profile} as const
    },
    savePhotoSuccess: (photos: PhotosType) => {
        return {type: 'SAVE_PHOTO_SUCCESS', photos} as const
    }
}

export const getUserProfile = (userId: number | null) => async (dispatch: Dispatch<ActionsType>) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfil(data))

}
export const getStatus = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: File) => async (dispatch: Dispatch<ActionsType>) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType ): ThunkType< ActionsType | FormAction > => async (dispatch, getState: ()=> AppStateType) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.message[0]}))
        return Promise.reject(data.message[0])
    }
}

export default profileReducer;

export type PostsType = {
    id: number
    likesCount: number
    message: string

}

export type initialStateType = typeof initialState

type ActionsType = InferActionsType<typeof actions>
