import {create} from "zustand";

interface PostSearchStore{
    value: string,
    setValue(value: string): void
}
export const usePostSearchStore = create<PostSearchStore>((set)=>({
    value: '',
    setValue(value: string) {
        set({value})
    }
}))