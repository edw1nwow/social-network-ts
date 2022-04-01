import React from "react";
import Preloader from "../Preloader/Preloader";
import {ProfileType} from "./ProfileContainer";

type ProfileInfoPropsType = {
    profile: null | ProfileType
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <img src={props.profile.photos.large} alt="Avatar"/>
            <h1>{props.profile.fullName} </h1>
            <div>
                <img src={props.profile.photos.small} alt="Avatar"/>
                <div>
                    <p>looking a job</p>
                    {props.profile.lookingForAJob === true ?
                        <input type='checkbox' defaultChecked={true} /> :
                        <input type='checkbox'defaultChecked={false}/>}
                </div>
                <p>Description about my looking a job: {props.profile.lookingForAJobDescription}</p>
                <p>Some info about me: {props.profile.aboutMe}</p>
                <h3>my links: </h3>
                <span>{props.profile.contacts.facebook}</span>
                <span>{props.profile.contacts.github}</span>
                <span>{props.profile.contacts.instagram}</span>
                <span>{props.profile.contacts.mainLink}</span>
                <span>{props.profile.contacts.twitter}</span>
                <span>{props.profile.contacts.vk}</span>
                <span>{props.profile.contacts.website}</span>
                <span>{props.profile.contacts.youtube}</span>
            </div>
        </div>
    );
}
export default ProfileInfo;