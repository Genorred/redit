import React from 'react';
import classes from './editableField.module.sass'
import {useCreatePost} from "../model/store.ts";
import {useResetRange} from "../../../features/addFieldPanel";
import {FieldInt} from "../model/model.ts";

interface EditableFieldInt extends React.HTMLAttributes<HTMLDivElement> {
    field: FieldInt
    index: number
    fields: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const EditableField = ({field, index, fields}: EditableFieldInt) => {
    const fieldArray = useCreatePost(state => state.fields)
    const {changeContent, addField, setSelectedField, setStyles} = useCreatePost()

    enum inputPlaceholder {
        title = 'Напишите заголовок',
        text = 'Напишите текст',
        img = 'Выберите файл'
    }

    const resetRange = useResetRange()
    const updateValue = (index: number) => (e: React.FormEvent) => {
        resetRange(e.currentTarget)
        changeContent(index, e.currentTarget.textContent || '')
    }
    const onEnter = (index: number) => (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (index !== fieldArray.length - 1) {
                resetRange(fields.current[index + 1])
                setSelectedField(index + 1)
            } else {
                addField('text', index + 1)
                setSelectedField(index + 1)
                setTimeout(() => {
                    resetRange(fields.current[index + 1])
                    setStyles(index + 1, fieldArray[index].styles)
                }, 0)
            }
        }
    }
    const openEditPanel = (index: number) => () => {
        setSelectedField(index)
    }
    return (
        <div className={`${classes.postCard} `}
             key={index} onClick={openEditPanel(index)}>
            <div contentEditable={true} suppressContentEditableWarning={true}
                 onInput={updateValue(index)}
                 onKeyDown={onEnter(index)}
                 className={`${classes.field} ${classes[field.type]}`}
                 data-placeholder={field.content ? '' : inputPlaceholder[field.type]}
                 style={field.styles || {}}
                 ref={(el) => fields.current[index] = el}
            >{field.content}</div>
        </div>
    );
};