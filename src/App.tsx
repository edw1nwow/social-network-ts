import React from 'react';
import './App.css';
import Header from "./components/Header/header";
import Navbar from "./components/Navbar/navbar";
import {BrowserRouter, Route} from 'react-router-dom'
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";





const App = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/dialogs' component={Dialogs}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
