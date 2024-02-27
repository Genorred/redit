import React from 'react';
import classes from './input.module.sass'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    invalid?: boolean
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({invalid, type, ...props}, ref) => {
    return (
        <input className={`${classes.input} ${invalid? classes.InvalidInput: ''}`} type={type} {...props} ref={ref}/>
    );
});

export default Input;