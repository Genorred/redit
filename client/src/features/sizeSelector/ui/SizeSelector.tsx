import React, {useCallback, useEffect, useState} from "react";
import {useCreatePost} from "../../../entities/editableField";
import Input from "../../../shared/ui/input/Input.tsx";
import {z} from "zod";

interface SizeListInt extends React.HTMLAttributes<HTMLOListElement> {
    index: number
    value: number
}
const ValidateSize = z.number().min(0).max(100)
export const SizeSelector = ({index, value}: SizeListInt) => {
    const {changeStyle} = useCreatePost()
    const [inputValue, setInputValue] = useState<number>(value);
    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if ((0 <= value && value <= 100 || !value))
            setInputValue(value)
    }, [index]);

    const saveChanges = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInputValue(inputValue||0)
        const size = (inputValue + 20)  || 20
        changeStyle(index, 'fontSize', `clamp(${size / 48}rem, ${size / 24}vw, ${size / 12}rem)`)
    }, [changeStyle, index, inputValue]);
    useEffect(() => {
        setInputValue(value)
    }, [value]);
    return (
        <form onSubmit={saveChanges} onBlur={saveChanges}>
            <Input type='number' min={0} max={100} value={inputValue} onChange={onInputChange}/>
        </form>
    );
};