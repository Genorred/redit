import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../../shared/config/routes.tsx";
import {useUserStore} from "../../entities/user/model/store.ts";
import {check} from "../../shared/api/user.ts";
import {useEffect} from "react";
import {Spinner} from "../../shared/ui/spinner";
import {useFetching} from "../../shared/lib/hooks";

const AppRouter = () => {
    const setUserState = useUserStore(state => state.setUser)
    const roles = useUserStore(state => state.roles)
    const fetchUser = async () => {
        await check().then(data => {
            setUserState(data)
        })
    }
    const [fetching, isLoading, error] = useFetching(fetchUser)
    useEffect(() => {
        fetching()
    }, []);
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <Routes>
            {roles.includes('USER') && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={route.element}/>
            )}
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={route.element}/>
            )}
        </Routes>
    );
};

export default AppRouter;