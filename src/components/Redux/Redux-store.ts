import {createStore,applyMiddleware, combineReducers} from "redux"
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./Auth-reducer";
import thunkMiddleware from "redux-thunk"

declare const window: any;

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export type RootStateRedux = ReturnType<typeof reducers>



export let store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store

export default store;