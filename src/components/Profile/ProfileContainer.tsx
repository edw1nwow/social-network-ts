import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/Profile-reducer";
import React from 'react';
import Profile from "./Profile";
import {RootStateRedux} from "../../redux/Redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


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
    status: string

}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type PathParamsType = {
    id: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsTypes
export type ProfilePropsTypes = MapStatePropsType & MapDispatchPropsType


class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.id
        if (!userId) {
            userId = '18041'
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)