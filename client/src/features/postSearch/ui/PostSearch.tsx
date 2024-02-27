import Input from "../../../shared/ui/input/Input.tsx";
import {usePostSearchStore} from "../model/store.ts";
import React from "react";

export const PostSearch = () => {
    const {value, setValue} = usePostSearchStore()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <Input value={value} onChange={onChange} placeholder='Search' invalid={false}/>
    );
};