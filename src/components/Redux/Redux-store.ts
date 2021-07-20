import {createStore, combineReducers} from "redux"
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import navbarReducer from "./Navbar-reducer";
import usersReducer from "./Users-reducer";



let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer
})

export type RootStateRedux = ReturnType<typeof reducers>

export const store = createStore(reducers);

//export type ReduxStoreType = typeof store

export default store;