import React, {useState} from "react";
import Preloader from "../Common/Preloader";

import ProfileStatusWithHooks from "./ProfileStatusWithHook";
import userPhoto from "../../Assets/Img/avatar.png";
import ProfileDataForm from "./ProfileDataForm";
import {ContactNames, ProfileType} from "../../types/types";

type ProfileInfoPropsType = {
    profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: File) => void
    saveProfile:  (profile: ProfileType) => Promise<boolean>
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

type ContactsType = {
    contactTitle?: string | null
    contactValue?: string | null
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const Contacts = ({contactTitle, contactValue}: ContactsType) => {
        return <div><b>{contactTitle}:</b>{contactValue}</div>
    }

    const onSubmit = (formData: any) => {
        console.log(formData)
      saveProfile(formData).then(()=>{setEditMode(false)})
    }

    const ProfileData = ({profile, goToEditMode}: ProfileDataType) => {

        return <div>
            {isOwner && <div><button onClick={goToEditMode}>Edite Mode</button></div>}
            <div>
                <b> Full name:</b>{profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b>
                {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>Some info about me: </b> {profile.aboutMe}
            </div>
           <div>
                <b>Contacts:</b>{Object.keys(profile.contacts).map((key) => {
               return <Contacts key={key} contactTitle={key} contactValue={profile.contacts ? profile.contacts[key as ContactNames] : ''}/>
            })}
            </div>
        </div>
    }

    return (
        <div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            <img src={profile.photos.large || userPhoto} alt="Avatar"/>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

            <div>
                <img src={profile.photos.small || userPhoto} alt="Avatar"/>
                {editMode ?  <ProfileDataForm initialValues={profile} onSubmit={onSubmit} profile={profile} isOwner={isOwner}/> : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={()=>{setEditMode(true)}}/>}

                {profile.lookingForAJob &&
                    <div>
                        <p>My professional skills: {profile.lookingForAJobDescription}</p>
                        <h3>my links: </h3>
                        <span>{profile.contacts.facebook}</span>
                        <span>{profile.contacts.github}</span>
                        <span>{profile.contacts.instagram}</span>
                        <span>{profile.contacts.mainLink}</span>
                        <span>{profile.contacts.twitter}</span>
                        <span>{profile.contacts.vk}</span>
                        <span>{profile.contacts.website}</span>
                        <span>{profile.contacts.youtube}</span>
                    </div>}
            </div>
        </div>
    );



}

export default ProfileInfo;