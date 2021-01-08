import React from 'react';

import {addPostAC, updatePostAC} from "../../State/Profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStoreType} from "../../State/redux-store";

export type MyPostsContainerPropsType = {
    store: ReduxStoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    let state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostAC(state.profilePage.messageForNewPost))
    }

    const onPostChange = (newText: any) => {
        let action = updatePostAC(newText)
        props.store.dispatch(action)
    }

    return (
        <div> <MyPosts posts={state.profilePage.posts} addPost={addPost} updateNewPostText={onPostChange} message={state.profilePage.messageForNewPost}/>
        </div>
    );
}

export default MyPostsContainer;
