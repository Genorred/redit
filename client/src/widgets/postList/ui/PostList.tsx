import {useTopicStore} from "../../../features/topicList";
import classes from './PostList.module.sass'
import {useFetching, useObserver} from "../../../shared/lib/hooks";
import {useCallback, useEffect, useRef, useState} from "react";
import {fetchPosts} from "../../../shared/api/post.ts";
import {PostCard} from "../../../entities/post";
import {usePostSearchStore} from "../../../features/postSearch";
import {Post} from "../../../entities/post/model/models.ts";
import {TopicInt} from "../../../entities/topic";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "../../../shared/ui/spinner";

export const PostList = () => {
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(10)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [posts, setPosts] = useState<Post[]>([])
    const chosenTopic = useTopicStore(state => state.chosenTopic)
    const searchValue = usePostSearchStore(state => state.value)
    const childRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const fetch = useCallback(async () => {
        console.log('gj')
        return await fetchPosts(page, limit, chosenTopic?._id, searchValue)
    }, [page, chosenTopic, searchValue])
    const {data, isLoading, error} = useQuery<{ posts: Post[], count: number }>(
        {queryKey: ['posts', page, chosenTopic, searchValue], queryFn: fetch, refetchOnWindowFocus: false})
    useEffect(() => {
        setPage(1)
    }, [chosenTopic, searchValue]);
    useEffect(() => {
        if (data) {
            console.log(data)
            if (page === 1)
                setPosts([...data.posts])
            else setPosts(state => [...state, ...data.posts])
            setTotalCount(data.count)
        }
    }, [data]);

    const onObserver = useCallback(() => {
        setPage(state => state + 1)
        console.log('hello', page)
    }, [posts]);
    useObserver({
        isLoading, childRef, observeCondition: page < Math.ceil(totalCount / limit), callback: onObserver, parentRef
    })
    return (
        <div className={classes.postList}>
            {posts.map((post) =>
                <PostCard post={post} key={post._id}/>
            )}
            {isLoading
                ? <Spinner/>
                : <div className={classes.observableDiv} ref={childRef}/>
            }
        </div>
    );
};


// import {useTopicStore} from "../../../features/topicList";
// import classes from './PostList.module.sass'
// import {useFetching, useObserver} from "../../../shared/lib/hooks";
// import {useCallback, useEffect, useRef, useState} from "react";
// import {fetchPosts} from "../../../shared/api/post.ts";
// import {PostCard} from "../../../entities/post";
// import {usePostSearchStore} from "../../../features/postSearch";
// import {Post} from "../../../entities/post/model/models.ts";
// import {TopicInt} from "../../../entities/topic";
//
// export const PostList = () => {
//     const [page, setPage] = useState<number>(1)
//     const [limit] = useState<number>(10)
//     const [totalCount, setTotalCount] = useState<number>(0)
//     const [posts, setPosts] = useState<Post[]>([])
//     const [topic, setTopic] = useState<TopicInt | null>(null)
//     const [search, setSearch] = useState<string>('')
//     const chosenTopic = useTopicStore(state => state.chosenTopic)
//     const searchValue = usePostSearchStore(state => state.value)
//     const childRef = useRef<HTMLDivElement>(null)
//     const parentRef = useRef<HTMLDivElement>(null)
//
//     const fetch = useCallback(async () => {
//         await fetchPosts(page, limit, chosenTopic?._id, searchValue).then(data => {
//             const anyChanges = topic === chosenTopic && search === searchValue
//             if (anyChanges) setPosts(state => [...state, ...data.posts])
//             else setPosts(data.posts)
//             setTotalCount(data.count)
//         })
//         setTopic(chosenTopic)
//         setSearch(searchValue)
//     }, [page, chosenTopic, searchValue])
//     const [fetching, isLoading, error] = useFetching(fetch)
//     useEffect(() => {
//         setPage(1)
//     }, [chosenTopic, searchValue]);
//     useEffect(() => {
//         fetching()
//     }, [page, chosenTopic, searchValue]);
//
//     useObserver({
//         isLoading, childRef, observeCondition: page < Math.ceil(totalCount / limit), callback: () => {
//             setPage(state => state + 1)
//             console.log('hello', page)
//         }, parentRef
//     })
//     return (
//         <div ref={parentRef} className={classes.postList}>
//             {posts.map((post) =>
//                 <PostCard post={post} key={post._id}/>
//             )}
//             {isLoading
//                 ? <></>
//                 : <div className={classes.observableDiv} ref={childRef}/>
//             }
//         </div>
//     );
// };