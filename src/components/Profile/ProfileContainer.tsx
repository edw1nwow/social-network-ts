import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/Profile-reducer";
import React from 'react';
import Profile from "./Profile";
import {AppStateType} from "../../redux/Redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/types";





type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photos:File) => void
    saveProfile: (profile: ProfileType) => Promise<boolean>


}



type PropsType = RouteComponentProps<any> & ProfilePropsTypes
export type ProfilePropsTypes = MapStatePropsType & MapDispatchPropsType


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.id
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                userId = this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.id !== prevProps.match.params.id){
        this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props} isOwner={!this.props.match.params.id} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter, withAuthRedirect
)(ProfileContainer)