import React, {ChangeEvent} from 'react';
import Post from "./Post/Post";
import {PostsType} from "../../State/Store";

export type MyPostsPropsType = {
    message: string
    posts: Array<PostsType>
    addPost: () => void
    updateNewPostText: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const MyPosts = (props: MyPostsPropsType) => {

    let onePost = props.posts.map(el => <Post message={el.message} likesCount={el.likesCount}/>);

    const addPost = () => {
        props.addPost()
    }
    const changeCallbackHandler = (e: any) => {
        let newValueTextField = e.currentTarget.value
        props.updateNewPostText(newValueTextField)
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
