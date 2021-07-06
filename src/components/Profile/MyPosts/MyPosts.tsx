import React from 'react';
import Post from "./Post/Post";
import {MyPostsPropsTypes} from './MyPostsContainer';



const MyPosts = (props: MyPostsPropsTypes) => {

    let onePost = props.profilePage.posts.map(el => <Post message={el.message} likesCount={el.likesCount}/>);

    const addPost = () => {
        props.addPost(props.profilePage.messageForNewPost)
    }
    const changeCallbackHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let newValueTextField = e.currentTarget.value
        props.updateNewPostText(newValueTextField)
    }

    return (
        <div>
            <div>
                <h4>new post</h4>
                <div><textarea value={props.profilePage.messageForNewPost} onChange={changeCallbackHandler}> </textarea></div>
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
