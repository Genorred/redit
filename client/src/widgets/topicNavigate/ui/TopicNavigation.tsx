import {TopicList} from "../../../features/topicList";
import classes from './topicNavigation.module.sass'
import {PostSearch} from "../../../features/postSearch";
import {useEffect, useRef} from "react";

export const TopicNavigation = () => {
    const scroll = useRef<HTMLOListElement>(null)
    const wheel = (e: WheelEvent) => {
        if (scroll.current) {
            scroll.current.scrollLeft += e.deltaY;
        }
        e.preventDefault()
    }
    useEffect(() => {
        if (scroll.current) {
            scroll.current.addEventListener("wheel", wheel, {passive: false});
        }
    }, []);






    return (
        <div className={classes.navigationBox}>
            <div onScroll={e => e.preventDefault()} className={classes.topicsBox}>
                <TopicList direction={'row'} ref={scroll}/>
                <div className={classes.transparentBlock}/>
            </div>
            <PostSearch/>
        </div>
    );
};