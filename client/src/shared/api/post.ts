import {$authHost, $host} from "../../App/http";

const url = import.meta.env.VITE_API_URL + 'api/post'
interface Content{
    type: string,
    content: string
}
export const createPost = async (title?: string, content?: Content[], topicId?: string) => {
    const {data} = await $authHost.post(url, {title, content, topicId})
    return data
}
export const updatePost = async (postId?: string, title?: string, content?: Content[]) => {
    const {data} = await $authHost.put(url, {postId, title, content})
    return data
}
export const fetchPosts = async (page: number, limit: number, topicId: string | undefined, title: string) => {
    const {data} = await $host.get(url, {params: {
            page, limit, topicId, title
        }})
    return data
}
export const findPost = async (_id: string | undefined) => {
    const {data} = await $host.get(url+`/${_id}`)
    return data
}
export const deletePost = async (_id: number) => {
    const {data} = await $authHost.delete(url+`/${_id}`)
    return data
}