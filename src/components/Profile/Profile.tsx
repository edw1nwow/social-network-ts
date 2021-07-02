import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile= () => {

    return (
        <div className={s.wrapper}>
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
