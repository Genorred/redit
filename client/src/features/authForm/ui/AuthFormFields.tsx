import Input from "../../../shared/ui/input/Input.tsx";
import classes from "./authForm.module.sass";
import {useFormContext} from "react-hook-form";
import {z} from "zod";

interface Form {
    name: string,
    password: string
}
export const AuthFormFieldsSchema = z.object({
    name: z.string().min(3),
    password: z.string().min(8)
})

const AuthFormFields = () => {
    const {register, formState: {errors}} = useFormContext<Form>()
    return (
        <div className={classes.formInputs}>
            <Input
                {...register('name', {required: true})}
                type='text'
                placeholder='введите имя'
                invalid={!!errors.name}
            />
            <Input
                {...register('password', {required: true})}
                type='password'
                placeholder='введите пароль'
                invalid={!!errors.password}
            />
        </div>
    );
};

export default AuthFormFields;