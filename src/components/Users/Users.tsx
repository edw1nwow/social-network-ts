import React from 'react'
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


type UsersPropsType = {
    follow: (userId: number) => void
    onPageChanged: (p: number) => void
    pageSize: number
    totalUsersCount: number
    unfollow: (userId: number) => void
    users: Array<UserType>
    currentPage: number
    toggleFollowingProgress: (isFetching: boolean, userID: number) => void
    followingInProgress: Array<number>
}

let Users: React.FC<UsersPropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} portionSize={10} totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {users.map((u: UserType) => <User user={u} followingInProgress={props.followingInProgress}
                                              unfollow={props.unfollow} follow={props.follow} key={u.id}/>)} </div>
    </div>
}
export default Users;