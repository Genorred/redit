import classes from './editPanel.module.sass'
import trash from "../../../shared/assets/trash.svg";
import more from "../../../shared/assets/more.svg";
import fontSize from "../../../shared/assets/fontSize.svg";
import bold from "../../../shared/assets/bold.svg";
import italic from "../../../shared/assets/italic.svg";
import {useCreatePost} from "../../../entities/editableField/model/store.ts";
import React, {useCallback, useMemo, useState} from "react";
import {SizeSelector} from "../../../features/sizeSelector";

interface EditPanelProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const EditPanel: React.FC<EditPanelProps> = () => {
    const index = useCreatePost(state => state.selectedField)
    const {removeField, changeStyle, setSelectedField} = useCreatePost()
    const fieldArray = useCreatePost(state => state.fields)
    const [showMore, setShowMore] = useState<boolean>(false)
    const toggleShowing = () => {
        setShowMore(state => !state)
    }
    const setStyle = (e: React.FormEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value) + 20
        console.log(e.target.value)
        changeStyle(index, 'fontSize', `clamp(${value / 48}rem, ${value / 24}vw, ${value / 12}rem)`)
    }
    const value = useMemo(() => {
        const regex = /(\d+(\.\d+)?)/
        let sizeArray
        if (fieldArray[index].styles?.fontSize)
            sizeArray = String(fieldArray[index].styles?.fontSize).match(regex)
        if (sizeArray)
            return Math.floor(Number(sizeArray[0]) * 48 - 20) || 0
    }, [fieldArray[index].styles?.fontSize])


    const deleteField = () => {
        removeField(index)
        setSelectedField(index-1)
    }
    const styleToggle = (key: string, value: string) => () => {
        if (fieldArray[index].styles[key] === value)
            changeStyle(index, key, 'normal')
        else changeStyle(index, key, value)
    }
    return (
        <div className={classes.editPanel}>
            <div className={classes.editRow}>
                <SizeSelector index={index} value={value||0}/>
                <img src={fontSize}/>
                <input type='range'
                       value={value}
                       onInput={setStyle}/>
                <img src={trash} onClick={deleteField}/>
            </div>
            <div className={classes.editRow}>
                <img src={bold} onClick={styleToggle('fontWeight', 'bold')}/>
                <img src={italic} onClick={styleToggle('fontStyle', 'italic')}/>
                <div className={classes.moreContainer}>
                    <img src={more} onClick={toggleShowing}/>
                    {showMore &&
                        <div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};