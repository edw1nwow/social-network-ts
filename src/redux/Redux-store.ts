import {createStore, applyMiddleware, compose, combineReducers} from "redux"
import profileReducer from "./Profile-reducer"
import dialogsReducer from "./Dialogs-reducer"
import navbarReducer from "./Navbar-reducer"
import usersReducer from "./Users-reducer"
import authReducer from "./Auth-reducer"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./App-reducer"
import thunkMiddleware from "redux-thunk"


let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    navbarPage: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.store = store

export default store

export type RootStateRedux = typeof rootReducer
export type AppStateType = ReturnType<RootStateRedux>

type PropertiesType<T> = T extends {[key: string ]: infer U} ? U : never

export type InferActionsType<T extends {[key: string ]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>
