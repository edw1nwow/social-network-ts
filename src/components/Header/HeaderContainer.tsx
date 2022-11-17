import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/Auth-reducer";
import {AppStateType} from "../../redux/Redux-store";




type MapStateToPropsType = {
    isAuth: boolean
    login: null | string

}
type MapDispatchPropsType = {
    logout: ()=>void
}

type HeaderContainerType = MapStateToPropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {




    render() {
        return (<Header {...this.props} />);
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);
