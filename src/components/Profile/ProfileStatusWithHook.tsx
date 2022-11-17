import React, {useEffect} from "react";

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusPropsType) => {

    let [editMode, setEditMode] = React.useState(false)
    let [status, setStatus] = React.useState(props.status)
        useEffect(()=>{
            setStatus(props.status)
        },[props.status])
    const activateMode = () => {
      setEditMode(true)
    }
    const deactivateMode = () => {
        setEditMode(false)
       props.updateStatus(status)
    }
    const onStatusChange = (e:any) =>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
            <div> <b>Status:</b> <span onDoubleClick={activateMode} >{props.status || '-----'}</span></div>}
            {editMode &&
                <div><input autoFocus={true} onBlur={deactivateMode} onChange={onStatusChange}
                            value={status} type='text' />
                </div>}
        </div>
    )

}

export default ProfileStatusWithHooks;