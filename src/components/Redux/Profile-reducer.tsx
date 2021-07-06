type PostsType = {
    id: string
    likesCount: number
    message: string
}

let initialState = {
    posts: [
        {id: '1', likesCount: 1, message: 'Hello'},
        {id: '2', likesCount: 2, message: 'Dima '},
        {id: '3', likesCount: 3, message: 'kak tu'},
        {id: '4', likesCount: 4, message: 'Nope'}
    ] as Array<PostsType>,
    messageForNewPost: ''
}

export type initialStateType = typeof initialState;

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
        default:
            return state;
    }
}

type addPostActionType = ReturnType<typeof addPostAC>
type UpdatePostActionType = ReturnType<typeof updatePostAC>

type ActionsType = addPostActionType | UpdatePostActionType

export const addPostAC = (postText: string) => {
    return {type: "ADD-POST", postText: postText} as const
}
export const updatePostAC = (newText: string) => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText} as const
}
export default profileReducer;