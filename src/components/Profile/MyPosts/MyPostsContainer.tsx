import React from 'react';
import {addPostAC, updatePostAC} from "../../State/Profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";



const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(Store) => {
            let state = Store.getState()

            const addPost = () => {
                Store.dispatch(addPostAC(state.profilePage.messageForNewPost))
            }

            const onPostChange = (newText: any) => {
                let action = updatePostAC(newText)
                Store.dispatch(action)
            }

            return <div>
                <MyPosts posts={state.profilePage.posts}
                         addPost={addPost}
                         updateNewPostText={onPostChange}
                         message={state.profilePage.messageForNewPost}/>
            </div>
        }}
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;
