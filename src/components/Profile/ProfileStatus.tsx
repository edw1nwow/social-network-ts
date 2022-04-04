import React from "react";


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {

        this.setState(
            {
                editMode: true
            }
        )
    }
    deActivateEditMode = () => {
        this.setState(
            {
                editMode: false
            }
        );
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }


    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div><span onDoubleClick={this.activateEditMode}>{this.props.status || '-----'}</span></div> :
                    <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode}
                                type='text' value={this.state.status}/>
                    </div>}
            </div>
        )
    }
}

export default ProfileStatus;