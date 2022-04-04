import React from 'react';
import Post from "./Post/Post";
import {MyPostsPropsTypes} from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";


type AddNewPostFormType = {
    newPostText: string
}

const MyPosts = (props: MyPostsPropsTypes) => {

    let onePost = props.profilePage.posts.map(el => <Post message={el.message} likesCount={el.likesCount}/>);

    const addPost = (values: AddNewPostFormType ) => {
        props.addPost(values.newPostText)
    }

    const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={'textarea'} placeholder={'type...'} />
            </div>
            <div>
                <button >Button</button>
            </div>
        </form>
    }
const AddNewPostFormRedux = reduxForm<AddNewPostFormType> ({form: 'profileAddNewPostForm'})(AddNewPostForm)
    return (
        <div>
            <div>
                <h4>new post</h4>
                <AddNewPostFormRedux onSubmit={addPost}/>
            </div>
            <h3>My Posts</h3>
            {onePost}

        </div>
    );
}

export default MyPosts;
