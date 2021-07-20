export type UserType = {
    id: string
    followed: boolean
    name: string
    status: string
    photos: {
        "small": string | undefined
        "large": null
    }
    location: {
        city: string
        country: string
    }
}

let initialState: initialStateType = {
    users: []
}


export type initialStateType = {
    users: Array<UserType>
}

const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case "SET-USERS":
            return {
                ...state, users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

type followActionType = ReturnType<typeof followAC>
type unfollowActionType = ReturnType<typeof unfollowAC>
type setUsersActionType = ReturnType<typeof setUsersAC>

type ActionsType = followActionType | unfollowActionType | setUsersActionType

export const followAC = (userID: string) => {
    return {type: "FOLLOW", userID: userID} as const
}
export const unfollowAC = (userID: string) => {
    return {type: "UNFOLLOW", userID: userID} as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {type: "SET-USERS", users: users} as const
}

export default usersReducer;