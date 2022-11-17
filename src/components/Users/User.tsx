import React from 'react'
import s from './Users.module.css'
import userPhoto from "../../Assets/Img/avatar.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img alt={user.name + 'avatar'} className={s.avatar}
                         src={user.photos.small != null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>{user.followed ?
                    <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>unfollow</button>
                    : <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                        follow(user.id)
                    }}>follow</button>}
                    <span><div>Name : {user.name}</div><div>{user.status}</div></span>
                    <span><div>{"user.location.country"}</div><div>{"user.location.city"}</div></span>
                    </div>
                    </span>
            </div>

        </div>)
}
export default User;