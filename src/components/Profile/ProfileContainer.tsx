import {connect} from "react-redux";
import {getUserProfile} from "../Redux/Profile-reducer";
import React from 'react';
import Profile from "./Profile";
import {RootStateRedux} from "../Redux/Redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";


export type ProfileType = {
    aboutMe: string,
    contacts: {
        facebook: null | string
        github: null | string
        instagram: null | string
        mainLink: null | string
        twitter: null | string
        vk: null | string
        website: null | string
        youtube: null | string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        small: string
        large: string
    }
    id: string
}

type MapStatePropsType = {
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}


type PathParamsType = {
    id: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsTypes

export type ProfilePropsTypes = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount(): void {
        let userId = this.props.match.params.id
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);
let mapStateToProps = (state: RootStateRedux): MapStatePropsType => ({
    profile: state.profilePage.profile
});


export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)