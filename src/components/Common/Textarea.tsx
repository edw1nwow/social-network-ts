import React from "react";
import styles from "./FormControl.module.css";
import {FieldValidatorType} from "../../utils/validator";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";



type FormControlPropsType = {
    meta: WrappedFieldMetaProps

}

export const FormControl: React.FC<FormControlPropsType> = ({ meta:{touched, error}, children, ...props}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
//    const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>

}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>

}

export function createField<FormKeysType extends string> (placeholder: string | undefined, name: FormKeysType, validators: Array<FieldValidatorType>, component: React.FC<WrappedFieldProps>, props ={ }, text: string = '') {
    return <div>
        <Field  component={component} name={name} placeholder={placeholder} validate={validators} {...props}/>{text}
    </div>
}