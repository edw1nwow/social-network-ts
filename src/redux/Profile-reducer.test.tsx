import profileReducer, {actions} from "./Profile-reducer";
import React from "react"
let state = {
    posts: [
        {id: 1, likesCount: 1, message: 'Hello'},
        {id: 2, likesCount: 2, message: 'Dima '},
        {id: 3, likesCount: 3, message: 'kak tu'},
        {id: 4, likesCount: 4, message: 'Nope'}
    ],
    profile: null,
    status: ""
}

it('new post should be added', ()=> {
    //1. test data
    let action = actions.addPost("it-kamasutra.com");

    //2. action
    let newState = profileReducer(state,action)
    // expectation
    expect(newState.posts.length).toBe(5);
})
it('new post should be correct', ()=> {
    //1. test data
    let action = actions.addPost("it-kamasutra.com");

    //2. action
    let newState = profileReducer(state,action)
    // expectation
    expect(newState.posts[4].message).toBe("it-kamasutra.com")
})
it('new post should be decremented', ()=> {
    //1. test data
    let action = actions.deletePost(1);

    //2. action
    let newState = profileReducer(state,action)
    // expectation
    expect(newState.posts.length).toBe(3)
})
it(`new post shouldn't be decremented if id is incorrect`, ()=> {
    //1. test data
    let action = actions.deletePost(1000);

    //2. action
    let newState = profileReducer(state,action)
    // expectation
    expect(newState.posts.length).toBe(4)
})