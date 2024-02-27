import React, {HTMLAttributes, useCallback, useEffect, useState} from "react";
import classes from './selector.module.sass'
import {Spinner} from "../../../shared/ui/spinner";

export type SelectingItem = string | number | undefined
export interface selectType {
    element: SelectingItem
    index: number
}
interface SelectorInt extends HTMLAttributes<HTMLDivElement> {
    selectingArray: SelectingItem[]
    isLoading: boolean
    selected: SelectingItem
    startAnimation: boolean
    select: (data: selectType)=>void
    search: (value: SelectingItem)=>void
    placeholder: string | number
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    observableDiv: React.RefObject<HTMLDivElement>
    observableDivParent: React.RefObject<HTMLDivElement>
}

export const NormalSelector = ({placeholder, selectingArray, selected, startAnimation, select, search,
                                  isLoading , observableDiv, observableDivParent}: SelectorInt) => {
    const [showSelectingArray, setShowSelectingArray] = useState<boolean>(startAnimation)
    const [value, setValue] = useState<SelectingItem>('');
    const [focused, setFocused] = useState<boolean>(false);
    const onSelect = useCallback((element: SelectingItem, index: number) => () => {
        select({element, index})
        setValue(element)
        setShowSelectingArray(state => !state)
    }, [select])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        search(e.target.value)
        setValue(e.target.value)
    }
    useEffect(() => {
        if(startAnimation)
            setShowSelectingArray(state => !state)
    }, []);
    const onInputFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true)
    }, []);
    const onInputBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false)
    }, []);

    return (
        <div className={classes.scrollWrapper}>
            <div className={`${classes.selector} ${classes[showSelectingArray ? 'show' : '']}`} ref={observableDivParent}>
                <input onChange={onChange}
                       onClick={()=>setShowSelectingArray(true)}
                       className={classes.selectedChoice}
                       placeholder={focused? String(placeholder): String(selected || placeholder)}
                       data-filterValue={value}
                       value={focused? value: ''} onFocus={onInputFocus} onBlur={onInputBlur}/>
                <div className={classes.selectingArray}>
                    {selectingArray.map((item, index) =>
                        <div onClick={onSelect(item, index)}
                        className={classes.choice}
                        >
                            {item}
                        </div>
                    )}
                    {isLoading && <div className={classes.spinner}><Spinner/></div>}
                </div>
                <div ref={observableDiv} className={classes.observableDiv}></div>
            </div>
        </div>
    );
};