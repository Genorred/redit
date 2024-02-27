import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {login, registration} from "../../../shared/api/user.ts";
import classes from "./authForm.module.sass";
import {Link} from "react-router-dom";
import {routePaths} from "../../../shared/config/routes.tsx";
import AuthFormFields, {AuthFormFieldsSchema} from "./AuthFormFields.tsx";
import {useUserForm} from "../model/store.ts";
import {useEffect} from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {useUserStore} from "../../../entities/user";
import {Button} from "../../../shared/ui/button";

interface AuthFormProps {
    isLogin: boolean
}
interface Form {
    name: string,
    password: string
}
export const AuthForm = ({isLogin}: AuthFormProps) => {
    const {setFormState, getFormState} = useUserForm()
    const methods = useForm<Form>({
        defaultValues: getFormState(),
        resolver: zodResolver(AuthFormFieldsSchema)
    })
    const {watch, handleSubmit} = methods
    const formFields = watch()
    const {name, password} = formFields
    const setUser = useUserStore(state => state.setUser)
    const submitRegistration: SubmitHandler<Form> = (data) => {
        registration(data.name, data.password).then(data=> {
            setUser(data)
            console.log('hkjhk');
        })
    }
    const submitLogin: SubmitHandler<Form> = (data) => {
        login(data.name, data.password).then(data=> {
            setUser(data)
            console.log('hkjhk');
        })
    }
    useEffect(() => {
        setFormState({name, password})
    }, [name, password]);
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(isLogin? submitLogin: submitRegistration)} className={classes.form}>
                <div className={classes.formCard}>
                    <div className={classes.formTitle}>
                        {isLogin ? 'Authorization' : 'Registration'}
                    </div>
                    <AuthFormFields/>
                    <section className={classes.formActions}>
                        <p className={classes.formActionsredirect}>
                            {isLogin? 'do not have an account?': 'already have an account'}
                            <Link to={isLogin? routePaths.Registration: routePaths.Login}>
                                {isLogin? ' sign in': ' sign up'}
                            </Link>
                        </p>
                        <Button>Submit</Button>
                    </section>
                </div>
            </form>
        </FormProvider>
    );
};