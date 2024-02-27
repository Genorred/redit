import React, {LiHTMLAttributes} from 'react';
import classes from './topic.module.sass'

export const Topic: React.FC<LiHTMLAttributes<HTMLLIElement>> = ({...props}) => {
    return (
        <li className={classes.topic} {...props}>
        </li>
    );
};