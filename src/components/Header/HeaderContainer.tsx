import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/Auth-reducer";
import {RootStateRedux} from "../../redux/Redux-store";



type MapStateToPropsType = {
    isAuth: boolean
    login: null | string
}
type MapDispatchPropsType = {
    getAuthUserData: () => void
}
type HeaderContainerType = MapStateToPropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerType> {


    componentDidMount(): void {
        this.props.getAuthUserData()

    }

    render() {
        return (<Header {...this.props} />);
    }
}


const mapStateToProps = (state: RootStateRedux): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
