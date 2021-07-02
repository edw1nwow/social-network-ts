import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker'
import {StateType} from "./components/State/Store";
import App from "./App";
import './index.css';
import Store from "./components/State/redux-store";
import {BrowserRouter} from "react-router-dom";
import  {Provider} from "./StoreContext";




export let rerenderEntireTree = (state: StateType) => {


    ReactDOM.render(
        <BrowserRouter>
            <Provider store={Store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(Store.getState());

Store.subscribe(()=>{
    let state = Store.getState();
    rerenderEntireTree(state);
});
/*Store.subscribe(renderTree)
renderTree()*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
