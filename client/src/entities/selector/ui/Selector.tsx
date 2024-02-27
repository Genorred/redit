import React, {HTMLAttributes, useEffect, useState} from "react";
import classes from './selector.module.sass'

interface SelectingElement {
    _id?: string,
    title: string
}

interface SelectorInt extends HTMLAttributes<HTMLDivElement> {
    SelectingList: React.ReactNode
    selected: SelectingElement | null
    startAnimation: boolean
}

export const Selector = ({SelectingList, selected, startAnimation}: SelectorInt) => {
    const [showSelectingArray, setShowSelectingArray] = useState<boolean>(startAnimation)
    const toggleShowingSelectingArray = () => {
        setShowSelectingArray(state => !state)
    }
    useEffect(() => {
        if(startAnimation)
        toggleShowingSelectingArray()
    }, []);
    return (
        <div className={classes.scrollWrapper}>
            <div className={`${classes.selector} ${classes[showSelectingArray ? 'show' : '']}`}>
                <p onClick={toggleShowingSelectingArray} className={classes.selectedChoice}>
                    {selected?.title || 'Select Topic'}
                </p>
                <hr/>
                <div onClick={toggleShowingSelectingArray}
                     className={`${classes.selectingArray} ${showSelectingArray && classes.showArray}`}>
                    {SelectingList}
                </div>
            </div>
        </div>
    );
};