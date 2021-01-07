import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";
import store from "../State/redux-store";


const Profile= () => {

    return (
        <div className={s.wrapper}>
            <ProfileInfo />
            <MyPosts  message={store.getState().profilePage.messageForNewPost} dispatch={store.dispatch.bind(store)} />
        </div>
    );
}

export default Profile;
