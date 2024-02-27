import {useLocation} from "react-router-dom";
import classes from "./auth.module.sass";
import {AuthForm} from "../../features/authForm/index.ts";

const Auth = () => {
    const location = useLocation().pathname
    const isLogin = location === '/login'
    return (
        <div className={classes.card}>
            <AuthForm isLogin={isLogin}/>
        </div>
    );
};

export default Auth;