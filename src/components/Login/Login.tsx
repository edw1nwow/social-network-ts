import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login:string,
    password: string,
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field type={"text"} component={'input'} name={'login'} placeholder={'login'}/></div>
        <div><Field type={"text"} component={'input'} name={'password'}placeholder={'password'}/></div>
        <div><Field type="checkbox" component={'input'} name={'rememberMe'}/>remember me</div>
        <div>
            <button>Log in</button>
        </div>
    </form>
}


const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)

const Login = () => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
export default Login