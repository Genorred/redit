import {create} from "zustand";
import {UserFormStore} from "./models.ts";

export const useUserForm = create<UserFormStore>((set, get) => ({
    name: '',
    password: '',
    setFormState(fields) {
        set({ ...fields })
    },
    getFormState(){
    const state = get()
    return {
        name: state.name,
        password: state.password
    }}
}))