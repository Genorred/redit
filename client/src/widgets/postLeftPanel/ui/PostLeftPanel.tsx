import classes from "./postLeftPanel.module.sass";
import {NormalSelector, selectType} from "../../../entities/selector";
import {useCallback, useEffect, useRef, useState} from "react";
import {fetchTopics} from "../../../shared/api/topic.ts";
import {useObserver} from "../../../shared/lib/hooks";
import {TopicInt} from "../../../entities/topic";
import {useCreatePost} from "../../../entities/editableField";
import {useQuery} from "@tanstack/react-query";

export const PostLeftPanel = () => {
    const selected = useCreatePost(state => state.selectedTopic)
    const {setSelectedTopic} = useCreatePost()
    const [topics, setTopics] = useState<TopicInt[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const limit = 12
    const [selectorValue, setSelectorValue] = useState<string>('');
    const childRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const fetch = useCallback(async (): Promise<void | { topics: TopicInt[], count: number }> => {
        const data = await fetchTopics(page, limit, selectorValue)
        console.log(selectorValue)
        return data
    }, [page, selectorValue])
    const {data, isLoading, error} = useQuery(
        {queryKey: ['createPostTopics', page, selectorValue], queryFn: fetch})
    useEffect(() => {
        console.log(data)
        if (data) {
            setTopics([...topics, ...data?.topics])
            setTotalCount(data?.count)
        }
    }, [data]);
    const chooseTopic = useCallback((data: selectType) => {
        setSelectedTopic(topics[data.index])
    }, [topics])

    const search = useCallback((value: string) => {
        setSelectorValue(value)
    }, []);
    useObserver({
        isLoading, childRef,
        observeCondition: page < Math.ceil(totalCount / limit),
        callback: () => {
            setPage(page => page + 1)
        }, parentRef
    })
    return (
        <div className={classes.postNavPanel}>
            <NormalSelector observableDivParent={parentRef} selectingArray={topics.map(topic => topic.title)}
                            selected={selected?.title} startAnimation={true}
                            select={chooseTopic} isLoading={isLoading}
                            search={search} placeholder={'select title'} observableDiv={childRef}/>
        </div>
    );
};