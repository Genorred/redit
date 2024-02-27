import {create} from "zustand";
import {UserStore} from "./models.ts";

export const useUserStore = create<UserStore>(set => ({
    name: '',
    roles: [],
    rating: 0,
    setUser: (user) => set({...user})
}))