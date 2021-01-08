import {createStore, combineReducers} from "redux"
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navbarPage: navbarReducer
})

export type RootStateRedux = ReturnType<typeof reducers>

let store = createStore(reducers);

export type ReduxStoreType = typeof store

export default store;