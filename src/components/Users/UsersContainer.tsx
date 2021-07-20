import {connect,} from "react-redux";
import Users from "./Users";
import {RootStateRedux} from "../Redux/Redux-store";
import {Dispatch} from "redux";
import {followAC, initialStateType, setUsersAC, unfollowAC, UserType} from "../Redux/Users-reducer";

type MapStatePropsType = {
    usersPage: initialStateType
}
type MapDispatchPropsType = {
    follow: (userId: string) => void,
    unfollow: (userId: string) => void
    setUsers: (users: Array<UserType>) => void
}

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {

        usersPage: state.usersPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: string) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
    }

}
export type UsersPropsTypes = MapStatePropsType & MapDispatchPropsType

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer;