import React, {ButtonHTMLAttributes} from "react";
import classes from './button.module.sass'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
}
export const Button = React.forwardRef<HTMLButtonElement,ButtonProps>
(({className, ...props}, ref) => {
    return (
        <button className={`${classes.button} ${className}`} ref={ref} {...props}>
        </button>
    );
});