import {connect} from "react-redux";
import {RootStateRedux} from "../../redux/Redux-store";
import {
    follow, getUsers,
    setCurrentPage,
    toggleFollowingProgress, unfollow,
    UserType
} from "../../redux/Users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from '../Preloader/Preloader'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


export type UsersPropsTypes = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}

type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersPropsTypes> {

    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users onPageChanged={this.onPageChanged} totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize} users={this.props.users} follow={this.props.follow}
                   unfollow={this.props.unfollow} currentPage={this.props.currentPage}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}




export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers
    }),
    withAuthRedirect
)(UsersContainer)