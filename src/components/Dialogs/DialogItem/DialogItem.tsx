import React from "react";
import s from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

type DialogType = {
    name: string
    id: string
}

const DialogItem: React.FC<DialogType> = ({name, id}) => {

    let path = '/Dialogs/' + id
    return (
        <div className={s.Dialog}>
            <NavLink to={path}>
                {name}
            </NavLink>
        </div>)
}

export default DialogItem;