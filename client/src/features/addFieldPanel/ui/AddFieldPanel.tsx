import React, {useEffect, useState} from 'react';
import add from "../../../shared/assets/add.svg";
import classes from "../../../widgets/fieldSpot/ui/fieldSpot.module.sass";
import {fieldType} from "../../../entities/editableField/model/model.ts";
import {useCreatePost} from "../../../entities/editableField";
import {useResetStyles} from "../lib/utils/resetStyles.ts";
import {useResetRange} from "../lib/utils/resetRange.ts";

interface AddFieldPanelInt extends React.HTMLAttributes<HTMLDivElement> {
    fields:  React.MutableRefObject<(HTMLDivElement | null)[]>
}
export const AddFieldPanel: React.FC<AddFieldPanelInt> = ({fields}) => {
    const fieldArray = useCreatePost(state => state.fields)
    const selectedField = useCreatePost(state => state.selectedField)
    const [addCount, setAddCount] = useState<number>(0)
    const {addField, setSelectedField} = useCreatePost()
    const addNewField = (type: fieldType, index: number) => () => {
        addField(type, index)
        setSelectedField(index)
        setAddCount(addCount+1)
    }
    const resetRange = useResetRange()
    const resetStyles = useResetStyles()
    useEffect(() => {
        resetRange(fields.current[selectedField])
        resetStyles(selectedField, fieldArray[selectedField])
    }, [addCount]);

    return (
        <div>
            <img onClick={addNewField('text', fieldArray.length)} src={add} className={classes.add}/>
        </div>
    );
};