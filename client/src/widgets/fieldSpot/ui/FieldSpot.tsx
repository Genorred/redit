import {Button} from "../../../shared/ui/button";
import {useEffect, useRef} from "react";
import classes from './fieldSpot.module.sass'
import {useTopicStore} from "../../../features/topicList";
import {useCreatePost} from "../../../entities/editableField/model/store.ts";
import {createPost} from "../../../shared/api/post.ts";
import {AddFieldPanel, useResetStyles} from "../../../features/addFieldPanel";
import {EditableField} from "../../../entities/editableField";

export const FieldSpot = () => {
    const selected = useTopicStore(state => state.chosenTopic)
    const fieldArray = useCreatePost(state => state.fields)
    const fields = useRef<Array<HTMLDivElement | null>>([])
    const sendPost = async () => {
        await createPost(fieldArray[0].content, fieldArray, selected?._id)
    }
    const resetStyles = useResetStyles()
    useEffect(() => {
        if (!Object.keys(fieldArray[0].styles).length)
            fieldArray.forEach((field, index)=>{
                resetStyles(index, field)
            })
    }, []);
    return (
        <div className={classes.fieldSpot}>
            {fieldArray.map((field, index) =>
                <EditableField key={index} field={field} index={index} fields={fields}/>
            )}
            <AddFieldPanel fields={fields}/>
            <Button onClick={sendPost}>Create Post</Button>
        </div>
    );
};