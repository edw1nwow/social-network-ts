import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

 type ProfilePropsType={
    profile: ProfileType | null
}

const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.wrapper}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
