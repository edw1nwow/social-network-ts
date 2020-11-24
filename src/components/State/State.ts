export type StoreType = {
    _state: StateType
    changeNewText: (newText: string) => void
    addPost: (postText: string) => void
    subscribe: (callback: () => void) => void
    _onChange: () => void
    getState: ()=> StateType
}
type MessageType = {
    message: string
}
type DialogType = {
    id: string
    name: string
}
type PostsType = {
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
}
export type StateType = {
    profilePage: ProfilePageType
    messagesPage: messagesPageType

}
export type myPostsType = {
    message: string
    addPostCallback: (postText: string) => void
    changeNewTextCallback: (newText: string) => void
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
                {id: "s2", name: "Lera"},
                {id: "3s", name: "vasya"},
                {id: "4s", name: "kirill"}
            ],
            messages: [
                {message: "Hello"},
                {message: "How are u"},
                {message: "Bye"},
                {message: "=D"}
            ]
        }
    },
    changeNewText(newText: string) {
        this._state.profilePage.messageForNewPost = newText
        this._onChange()
    },
    addPost(postText: string) {
        let newPost: PostsType = {
            id: '5',
            message: postText,
            likesCount: 0
        }
        Store._state.profilePage.posts.push(newPost)
        this._onChange()
    },
    _onChange() {
        console.log('hello')
    },
    subscribe(callback) {
        this._onChange = callback
    },
    getState(){
       return this._state
    }
}


export default Store;