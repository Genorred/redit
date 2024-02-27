import {FieldInt} from "../../../../entities/editableField/model/model.ts";
import {useCreatePost} from "../../../../entities/editableField/model/store.ts";

export const useResetStyles = (): (index: number, field: FieldInt)=>void => {
    const {changeStyle} = useCreatePost()
    const resetStyles = (index: number, field: FieldInt) => {
        changeStyle(index, 'fontSize', field.type === 'title' && 'clamp(2rem, 4vw, 6rem)')
        changeStyle(index, 'fontSize', field.type === 'text' && 'clamp(1rem, 2vw, 4rem)')
    }
    return resetStyles
}