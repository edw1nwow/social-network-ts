import React, {ChangeEvent} from 'react';
import Post from "./Post/Post";
import {myPostsType} from "../../State/State";
import Store from "../../State/State";

const MyPosts = (props: myPostsType) => {

    let onePost = Store._state.profilePage.posts.map(el => <Post message={el.message} likesCount={el.likesCount}/>);

    const addPost = () => {
            props.addPostCallback(props.message)
    }
    const changeCallbackHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewTextCallback(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                <h4>new post</h4>
                <div><textarea value={props.message} onChange={changeCallbackHandler}> </textarea></div>
                <div>
                    <button onClick={addPost}>Button</button>
                </div>
            </div>
            <h3>My Posts</h3>
            {onePost}

        </div>
    );
}

export default MyPosts;
