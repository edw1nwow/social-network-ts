import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import store from "../State/redux-store";


const Profile= () => {

    return (
        <div className={s.wrapper}>
            <ProfileInfo />
            <MyPostsContainer store={store} />
        </div>
    );
}

export default Profile;
