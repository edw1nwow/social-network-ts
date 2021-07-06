import {addPostAC, initialStateType, updatePostAC} from "../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootStateRedux} from "../../Redux/Redux-store";
import { Dispatch } from 'redux';

export type MapStatePropsType = {
    profilePage:initialStateType
}

type MapDispatchPropsType = {
    updateNewPostText: (newText: string) => void,
    addPost: (postText: string) => void
}
export type MyPostsPropsTypes = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: RootStateRedux): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        updateNewPostText: (newText: string) => {
            let action = updatePostAC(newText)
            dispatch(action)
        },
        addPost: (postText: string) => {
            dispatch(addPostAC(postText))

        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
