import React, {useCallback, useEffect, useRef} from "react";

interface UseObserverProps {
    isLoading: boolean,
    childRef: React.RefObject<HTMLElement>,
    observeCondition: any,
    callback: () => void,
    parentRef: React.RefObject<HTMLElement>
}

export const useObserver = ({isLoading, childRef, observeCondition, callback, parentRef}: UseObserverProps) => {
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        if (observer.current)
            observer.current?.disconnect()
        const options = {
            rootMargin: "0px",
            threshold: 0,
        };
        console.log('outer')
        observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            console.log(entries, observeCondition)
            if (entries[0].isIntersecting && observeCondition) {
                console.log('inner')
                console.log(childRef.current)
                callback()
            }
        }, options)
        childRef.current && observer.current.observe(childRef.current)
        return function () {
            if (childRef.current)
                observer.current?.unobserve(childRef.current)
        }
    }, [callback]);
}