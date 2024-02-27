import {create} from "zustand";
import {TopicInt} from "../../../entities/topic";

interface TopicListStore {
    topics: TopicInt[] | [],
    chosenTopic: TopicInt | null,
    totalCount: number
    setTopics(topics: TopicInt[]): void
    setChosenTopic(id: TopicInt): void
    setTotalCount(count:number): void
}

export const useTopicStore = create<TopicListStore>((set)=>({
    topics: [],
    chosenTopic: null,
    totalCount: 0,
    setTopics(topics) {
        set((state)=>({topics: [...state.topics, ...topics]}))
    },
    setChosenTopic(chosenTopic) {
        set({chosenTopic})
    },
    setTotalCount(totalCount) {
        set({totalCount})
    },
}))