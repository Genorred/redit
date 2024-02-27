import {create} from "zustand";
import {Post} from "../../../entities/post/model/models.ts";

interface TopicListStore {
    posts: Post[] | [],
    totalCount: number
    setPosts(topics: Post[]): void
    setTotalCount(count:number): void
}

export const usePostStore = create<TopicListStore>((set)=>({
    posts: [],
    totalCount: 0,
    setPosts(posts) {
        set({posts})
    },
    setTotalCount(totalCount) {
        set({totalCount})
    },
}))