import React from "react";
import {UsersPropsTypes} from "./UsersContainer";
import s from './Users.module.css'
import userPhoto from "../Assets/Img/avatar.png";
import axios from "axios";
import {UserType} from "../Redux/Users-reducer";

class Users extends React.Component<UsersPropsTypes> {
    constructor(props: UsersPropsTypes) {
        super(props);
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <div>
            {this.props.users.map((u: UserType) => <div key={u.id}>
            <span>
                <div>
                    <img alt={u.name + 'avatar'} className={s.avatar}
                         src={u.photos.small != null ? u.photos.small : userPhoto}/>
                </div>
                <div>{u.followed ? <button onClick={() => {
                        this.props.unfollow(u.id)
                    }}>unfollow</button>
                    : <button onClick={() => {
                        this.props.follow(u.id)
                    }}>follow</button>}
                    <span><div>Name : {u.name}</div><div>{u.status}</div></span>
                    <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>
                </div>
            </span>

            </div>)
            } </div>
    }
}

export default Users