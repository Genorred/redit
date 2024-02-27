interface contentInt{
    type: string,
    content: string,
    styles: {[key: string]: string}
}
export interface Post {
    _id: number
    title: string
    content: contentInt[]
    userId: string
    rating: number
    topicId: string
}