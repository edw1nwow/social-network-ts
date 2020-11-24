import React from 'react';
import s from './header.module.css'


const Header = () => {

    return (
        <div className={s.header}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#000" d="M20 40C9 40 0 31 0 20C0 9 9 0 20 0C31 0 40 9 40 20C40 31 31 40 20 40ZM20 2C10.1 2 2 10.1 2 20C2 29.9 10.1 38 20 38C29.9 38 38 29.9 38 20C38 10.1 29.9 2 20 2Z"/><path fill="#000" fill-rule="evenodd" d="M16.7 24.1L26 15.7C26.4 15.3 25.9 15.2 25.4 15.5L14 22.7L9.10003 21.2C8.00003 20.9 8.00003 20.1 9.30003 19.6L28.6 12.2C29.5 11.8 30.3 12.4 30 13.8L26.7 29.3C26.5 30.4 25.8 30.7 24.9 30.2L19.9 26.5L17.5 28.8C17.2 29.1 16.8 29.1 16.8 28.8L16.7 24.1Z" clip-rule="evenodd"/></svg>
        </div>
    );
}

export default Header;
