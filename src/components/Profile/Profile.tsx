import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";



 type ProfilePropsType={
    profile: ProfileType | null
     status: string
     updateStatus: (status: string) => void
     isOwner: boolean
     savePhoto: (photos:File) => void
     saveProfile:  (profile: ProfileType) => Promise<boolean>
 }

const Profile = (props: ProfilePropsType) => {
    return (
        <div className={s.wrapper}>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;
