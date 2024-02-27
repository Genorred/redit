import {NavLink} from "react-router-dom";
import {routePaths} from "../../../shared/config/routes.tsx";
import {useUserStore} from "../../../entities/user";
import classes from './navbar.module.sass'

export const NavBar = () => {
    const setUser = useUserStore(state => state.setUser)
    const role = useUserStore(state => state.roles)
    const exit = () => {
        setUser({id: '', name: '', rating: 0, roles: []})
        document.cookie = ('token=; max-age=0')
    }
    return (
        <nav className={classes.navbar}>
            <NavLink to={routePaths.Posts}>Посты</NavLink>
            {role.includes('USER')
                ? <>
                    <NavLink to={routePaths.CreatePost}>Создать пост</NavLink>
                    <div/>
                    <NavLink to={routePaths.User}>Профиль</NavLink>
                    <NavLink onClick={exit} to={routePaths.Login}>Выйти</NavLink>
                </>
                : <>
                    <div/>
                    <div/>
                    <div/>
                    <NavLink to={routePaths.Login}>Зайти</NavLink>
                </>
            }
        </nav>
    );
};