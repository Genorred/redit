import React, {OlHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';
import {fetchTopics} from "../../../shared/api/topic.ts";
import {Topic, TopicInt} from "../../../entities/topic";
import {useTopicStore} from "../model/store.ts";
import classes from './topicList.module.sass'
import {useFetching, useObserver, useVerticalScroll} from "../../../shared/lib/hooks";
import {Error} from "../../../entities/error";

interface TopicListType extends OlHTMLAttributes<HTMLOListElement> {
    direction: 'column' | 'row'
}

export const TopicList = React.forwardRef<HTMLOListElement, TopicListType>(({direction, ...props}, ref) => {
    const {setChosenTopic} = useTopicStore()
    const [topics, setTopics] = useState<TopicInt[]>([])
    const [totalCount, setTotalCount] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(12)
    const fetch = useCallback(async (page: number, limit: number) => {
        await fetchTopics(page, limit).then((data) => {
            setTopics(state => [...state, ...data.topics])
            setTotalCount(data.count)
        })
    }, [page, limit])
    const [fetching, isLoading, error] = useFetching(fetch)
    useEffect(() => {
        fetching(page, limit)
    }, [page]);
    const chooseTopic = (topic: TopicInt) => () => {
        setChosenTopic(topic)
    }
    const childRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLOListElement>(null)
    useVerticalScroll(parentRef)
    useObserver({
        isLoading, childRef, observeCondition: page < Math.ceil(totalCount / limit), callback: () => {
            setPage(page => page + 1)
            console.log(page)
        }, parentRef
    })
    return (
        <ol ref={parentRef} className={`${classes.topicList} ${classes[direction]}`} {...props}>
            {topics.map(topic =>
                <Topic key={topic._id} onClick={chooseTopic(topic)}>{topic.title}</Topic>
            )}
            {isLoading
                ? <></>
                : <div ref={childRef} style={{width: 1, height: 1}}/>
            }
            {error && <Error message={error}/>}
        </ol>
    );
});