import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {FieldInt, fieldType, styles} from "./model.ts";
import {TopicInt} from "../../topic";

interface UseCreateStore {
    fields: FieldInt[]
    selectedField: number
    selectedTopic: TopicInt | null

    changeContent: (index: number, content: string) => void
    removeField: (index: number) => void
    addField: (type: fieldType, index: number) => void
    changeStyle: (index: number, key: string, value: any)=>void
    setStyles: (index: number, styles: styles)=>void
    setSelectedField: (index: number)=>void
    setSelectedTopic: (index: TopicInt)=>void
}
export const useCreatePost = create<UseCreateStore>()(immer(set => ({
    selectedTopic: null,
    fields: [{
        type: 'title',
        content: '',
        styles: {}
    },
        {
            type: 'text',
            content: '',
            styles: {}
        },],
    selectedField: 0,
    setSelectedField: (index)=>set(state=>{
        state.selectedField=index
    }),
    setSelectedTopic: (topic)=>set(state=>{
        state.selectedTopic=topic
    }),
    removeField: (index) => set(state => {
        if (index!==0) {
            state.fields = state.fields.filter((_, i) => i !== index)
        }
    }),
    changeContent: (index, content) => set(state => {
        state.fields[index].content = content
    }),
    addField: (type, index) => set(state =>{
        state.fields.splice(index, 0, {
            type,
            content: '',
            styles: {}
        })
    }),
    changeStyle: (index, key, value) => set(state=>{
        if (value)
        state.fields[index].styles[key] = value
    }),
    setStyles: (index, styles) => set(state=>{
        state.fields[index].styles = styles
    })
})))