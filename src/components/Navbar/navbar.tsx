import React from 'react';
import s from './navbar.module.css'
import {NavLink} from "react-router-dom";


const Navbar = () => {

    return (
        <div className={s.sidebar}>
            <NavLink to="/Profile">profile</NavLink>
            <NavLink to="/Dialogs">messages</NavLink>
            <NavLink to="#">news</NavLink>
            <NavLink to="#">music</NavLink>
            <NavLink to="#">settings</NavLink>
        </div>
    );
}

export default Navbar;
