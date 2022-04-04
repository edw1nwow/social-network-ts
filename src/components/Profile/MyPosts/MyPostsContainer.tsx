import {addPost, initialStateType} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootStateRedux} from "../../../redux/Redux-store";
import { Dispatch } from 'redux';

export type MapStatePropsType = {
    profilePage:initialStateType
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsTypes = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
