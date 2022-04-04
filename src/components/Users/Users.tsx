import React from 'react'
import {UserType} from "../../redux/Users-reducer";
import s from './Users.module.css'
import userPhoto from "../../Assets/Img/avatar.png";
import {NavLink} from "react-router-dom";



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

let Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(
                p => {
                    return <span key={p} className={`${props.currentPage === p && s.selectedPage}`}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}>{p}</span>
                }
            )}
        </div>

        {props.users.map((u: UserType) => <div key={u.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img alt={u.name + 'avatar'} className={s.avatar}
                         src={u.photos.small != null ? u.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>{u.followed ?
                    <button disabled={props.followingInProgress.some((id: number) => id === u.id)} onClick={() =>
                    {props.unfollow(u.id)}}>unfollow</button>
                    : <button disabled={props.followingInProgress.some((id: number) => id === u.id)} onClick={() =>
                    {props.follow(u.id)}}>follow</button>}
                    <span><div>Name : {u.name}</div><div>{u.status}</div></span>
                    <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>
                    </div>
                    </span>
        </div>)
        } </div>
}
export default Users;