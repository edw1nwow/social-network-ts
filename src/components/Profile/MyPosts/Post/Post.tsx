import React from 'react';


export type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = ({message, likesCount}) => {

    return (
        <div>
            <img src="" alt=""/>
            <div>{message}</div>
            <div><span>Likes {likesCount}</span></div>
        </div>
    );
}

export default Post;
