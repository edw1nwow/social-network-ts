import {ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI, usersAPI} from "../api/Api";
import {Dispatch} from "redux";

export type PostsType = {
    id: string
    likesCount: number
    message: string
}

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState: initialStateType = {
    posts: [
        {id: '1', likesCount: 1, message: 'Hello'},
        {id: '2', likesCount: 2, message: 'Dima '},
        {id: '3', likesCount: 3, message: 'kak tu'},
        {id: '4', likesCount: 4, message: 'Nope'}
    ],
    profile: null,
    status: ""
}

export type initialStateType = {
    posts: Array<PostsType>
    profile: null | ProfileType
    status: string
}

type ActionsType = addPostActionType | setUserProfile | setStatusActionType

const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostsType = {
                id: '5',
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;

    }
}

type addPostActionType = ReturnType<typeof addPost>
type setUserProfile = ReturnType<typeof setUserProfil>
type setStatusActionType = ReturnType<typeof setStatus>


export const addPost = (newPostText: string) => {
    return {type: ADD_POST, newPostText} as const
}
export const setStatus = (status: string) => {
    return {type: SET_STATUS, status} as const
}

const setUserProfil = (profile: ProfileType) => {
    return {type: SET_USER_PROFILE, profile} as const
}

export const getUserProfile = (userId: string) => (dispatch: Dispatch<setUserProfile>) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfil(response.data))
    });
}
export const getStatus = (userId: string) => (dispatch: Dispatch<setStatusActionType>) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    });
}
export const updateStatus = (status: string) => (dispatch: Dispatch<setStatusActionType>) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    });
}

export default profileReducer;