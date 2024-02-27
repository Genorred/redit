import classes from './error.module.sass'

interface ErrorProps {
    message: string
}
export const Error = ({message}: ErrorProps) => {
    return (
        <div className={classes.error}>
            {message}...
        </div>
    );
};