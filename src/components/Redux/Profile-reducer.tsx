import {ProfileType} from "../Profile/ProfileContainer";
import {usersAPI} from "../Api/Api";
import {Dispatch} from "redux";

export type PostsType = {
    id: string
    likesCount: number
    message: string
}

let initialState: initialStateType = {
    posts: [
        {id: '1', likesCount: 1, message: 'Hello'},
        {id: '2', likesCount: 2, message: 'Dima '},
        {id: '3', likesCount: 3, message: 'kak tu'},
        {id: '4', likesCount: 4, message: 'Nope'}
    ],
    messageForNewPost: '',
    profile: null
}

export type initialStateType = {
    posts: Array<PostsType>,
    messageForNewPost: string,
    profile: null | ProfileType
}

type ActionsType = addPostActionType | updatePostActionType | setUserProfile

const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostsType = {
                id: '5',
                message: action.postText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                messageForNewPost: ''
            }
        }
        case 'UPDATE-NEW-POST-TEXT':
            return {
                ...state,
                messageForNewPost: action.newText
            }
        case 'SET-USER-PROFILE':
            return {
                ...state, profile: action.profile
            }
        default:
            return state;
    }
}

type addPostActionType = ReturnType<typeof addPost>
type updatePostActionType = ReturnType<typeof updatePost>
type setUserProfile = ReturnType<typeof setUserProfile>


export const addPost = (postText: string) => {
    return {type: "ADD-POST", postText: postText} as const
}

export const updatePost = (newText: string) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText} as const
}

const setUserProfile = (profile: ProfileType) => {
    return {type: "SET-USER-PROFILE", profile} as const
}
export const getUserProfile = (userId: string) => (dispatch: Dispatch<setUserProfile>) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    });
}
export default profileReducer;