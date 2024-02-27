import {$host} from "../../App/http";
import {TopicInt} from "../../entities/topic";

const url = import.meta.env.VITE_API_URL + 'api/topic'
export const createTopic = async (title: string) => {
    const {data} = await $host.post(url, {title})
    return data
}
export const updateTopic = async (id: string, title: string) => {
    const {data} = await $host.put(url, {id, title})
    return data
}
export const fetchTopics = async (page: number, limit: number, title?: string): Promise<{topics: TopicInt[], count: number}> => {
    const {data} = await $host.get(url, {params: {
            page, limit, title
        }})
    console.log(title)
    return data
}
export const deleteTopic = async (id: string) => {
    const {data} = await $host.delete(url+`/${id}`)
    return data
}