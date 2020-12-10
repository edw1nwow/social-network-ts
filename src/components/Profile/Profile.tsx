import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";
import Store from "../State/State";


const Profile= () => {

    return (
        <div className={s.wrapper}>
            <ProfileInfo />
            <MyPosts  message={Store._state.profilePage.messageForNewPost} dispatch={Store.dispatch.bind(Store)} />
        </div>
    );
}

export default Profile;
