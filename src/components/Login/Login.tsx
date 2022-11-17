import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validator";
import {createField, Input} from "../Common/Textarea";
import {connect} from "react-redux";
import {login} from "../../redux/Auth-reducer";
import {Redirect} from "react-router-dom";
import styles from '../Common/FormControl.module.css'
import {AppStateType} from "../../redux/Redux-store";


type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void

}

type LoginFormOwnType = {
    captchaUrl: string | null
}
export type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
type LoginFormTypeKeys = Extract<keyof FormDataType, string>


const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnType> & LoginFormOwnType> = ({
                                                                                                       handleSubmit,
                                                                                                       error,
                                                                                                       captchaUrl
                                                                                                   }) => {
    return <form onSubmit={handleSubmit}>

        {createField<LoginFormTypeKeys>('Email', 'email', [required], Input,)}
        {createField<LoginFormTypeKeys>('password', 'password', [required], Input, {type: 'password'})}
        {createField<LoginFormTypeKeys>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

        {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
        {captchaUrl && createField<LoginFormTypeKeys>("Symbols from image", 'captcha', [required], Input, {},)}
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Log in</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnType>({
    form: 'login'
})(LoginForm)


const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/Profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)