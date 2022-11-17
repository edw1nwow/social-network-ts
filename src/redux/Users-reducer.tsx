import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./Redux-store";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>
}


const usersReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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

export const actions = {
    followSuccess: (userID: number) => {
        return {type: "FOLLOW", userID: userID} as const
    },
    unfollowSuccess: (userID: number) => {
        return {type: "UNFOLLOW", userID: userID} as const
    },
    setUsers: (users: Array<UserType>) => {
        return {type: "SET-USERS", users: users} as const
    },
    setCurrentPage: (currentPage: number) => {
        return {type: "SET-CURRENT-PAGE", currentPage: currentPage} as const
    },
    setTotalUsersCount: (totalUsersCount: number) => {
        return {type: "SET-USERS-TOTAL-COUNT", count: totalUsersCount} as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {type: "SET-TOGGLE", isFetching} as const
    },
    toggleFollowingProgress: (isFetching: boolean, userID: number) => {
        return {type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userID} as const
    }
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}
export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: Awaited<(userId:number) => any> , actionCreator: (userId: number)=> ActionsType ) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    console.log(apiMethod(userId))
    if (response.data.resultCode === 0) {
        console.log(actionCreator)
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export default usersReducer;

export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type DispatchType = Dispatch<ActionsType>
type ThunkType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>