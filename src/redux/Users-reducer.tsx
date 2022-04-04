import {usersAPI} from "../api/Api";
import {Dispatch} from "redux";


export type UserType = {
    id: number
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
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
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
                ...state, users: action.users
            }
        case "SET-CURRENT-PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "SET-USERS-TOTAL-COUNT":
            return {
                ...state, totalUsersCount: action.count
            }
        case "SET-TOGGLE":
            return {
                ...state, isFetching: action.isFetching
            }
        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter((id: number) => id !== action.userID)
            }
        default:
            return state;
    }
}

type followActionType = ReturnType<typeof followSuccess>
type unfollowActionType = ReturnType<typeof unfollowSuccess>
type setUsersActionType = ReturnType<typeof setUsers>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setUsersTotalCountType = ReturnType<typeof setTotalUsersCount>
type setToggleType = ReturnType<typeof toggleIsFetching>
type toggleFollowingType = ReturnType<typeof toggleFollowingProgress>

type ActionsType =
    followActionType
    | unfollowActionType
    | setUsersActionType
    | setCurrentPageType
    | setUsersTotalCountType
    | setToggleType
    | toggleFollowingType

export const followSuccess = (userID: number) =>
// ({type:"FOLLOW", userID})
{
    return {type: "FOLLOW", userID: userID} as const
}
export const unfollowSuccess = (userID: number) =>
// ({type: "UNFOLLOW", userID})
{
    return {type: "UNFOLLOW", userID: userID} as const
}
export const setUsers = (users: Array<UserType>) =>
// ({type: "SET-USERS", users})
{
    return {type: "SET-USERS", users: users} as const
}
export const setCurrentPage = (currentPage: number) =>
// ({type: "SET-CURRENT-PAGE", currentPage})
{
    return {type: "SET-CURRENT-PAGE", currentPage: currentPage} as const
}
export const setTotalUsersCount = (totalUsersCount: number) =>
// ({type: "SET-USERS-TOTAL-COUNT", count: totalUsersCount})
{
    return {type: "SET-USERS-TOTAL-COUNT", count: totalUsersCount} as const
}
export const toggleIsFetching = (isFetching: boolean) =>
// ({type: "SET-TOGGLE", isFetching})
{
    return {type: "SET-TOGGLE", isFetching} as const
}
export const toggleFollowingProgress = (isFetching: boolean, userID: number) =>
// ({type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userID})
{
    return {type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userID} as const
}


export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch<setToggleType | setUsersActionType | setUsersTotalCountType>) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        });
    }
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch<toggleFollowingType | followActionType>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            });

    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<toggleFollowingType | unfollowActionType>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        });

    }
}


export default usersReducer;