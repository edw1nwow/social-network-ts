import React from "react";

import {createField, Input, Textarea} from "../Common/Textarea";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../Common/FormControl.module.css";
import {ProfileType} from "../../types/types";

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
}

const ProfileDataForm: React.FC<ProfileDataType & InjectedFormProps<{}, ProfileDataType>> = ({handleSubmit,profile,error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button>
            {error && <div className={styles.formSummaryError}>{error} </div>}
        </div>
        <div>
            <b> Full name:</b> {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createField('', "lookingForAJob", [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills:</b>
            {createField('My professional skills', "lookingForAJobDescription", [], Textarea,)}
        </div>

        <div>
            <b>Some info about me: </b>
            {createField('Some info about me', "aboutMe", [], Textarea,)}
        </div>
        <div>
            <b>Contacts:</b>{Object.keys(profile.contacts).map((key?: string | undefined ) => {
            if (key !== undefined) {
                return <div key={key}>
                    <b> {key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            }
        })}
        </div>
    </form>
}
const ProfileDataFormReduxForm = reduxForm<{}, ProfileDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;