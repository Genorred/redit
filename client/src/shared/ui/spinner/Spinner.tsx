import classes from './spinner.module.sass'
import React from "react";

export const Spinner = ({...props}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={classes.spinner}/>
    );
};