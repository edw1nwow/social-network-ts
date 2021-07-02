import profileReducer, {addPostAC, updatePostAC} from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";
import {ChangeEvent} from "react";

export type StoreType = {
    _state: StateType
    changeNewText: (newText: string) => void
    addPost: (postText: string) => void
    subscribe: (callback: () => void) => void
    _callSubscriber: (observer: object) => void
    getState: () => StateType
    dispatch: (action: any) => void
}
type MessageType = {
    id: string
    message: string
}
type DialogType = {
    id: string
    name: string
}
export type PostsType = {
    id: string
    likesCount: number
    message: string
}
type ProfilePageType = {
    messageForNewPost: string
    posts: Array<PostsType>
}
type messagesPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}
export type StateType = {
    profilePage: ProfilePageType
    messagesPage: messagesPageType
    navbarPage: object
}
export type myPostsContainerType = {
    Store: StoreType
}



const Store: StoreType = {
    _state: {
        profilePage: {
            messageForNewPost: '',
            posts: [
                {id: '1', likesCount: 1, message: 'Hello'},
                {id: '2', likesCount: 2, message: 'Dima '},
                {id: '3', likesCount: 3, message: 'kak tu'},
                {id: '4', likesCount: 4, message: 'Nope'}
            ]
        },
        messagesPage: {
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
        },
        navbarPage: {}
    },
    changeNewText(newText: string) {
        this._state.profilePage.messageForNewPost = newText
        this._callSubscriber(this._state)
    },
    addPost(postText: string) {
        let newPost: PostsType = {
            id: '5',
            message: postText,
            likesCount: 0
        }
        Store._state.profilePage.posts.push(newPost)
        this._callSubscriber(this._state)
    },
    _callSubscriber() {
        console.log(this._state)
    },
    subscribe(callback) {
        this._callSubscriber = callback
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.navbarPage = navbarReducer(this._state.navbarPage, action)
        this._callSubscriber(this._state)
    }
}


export default Store;