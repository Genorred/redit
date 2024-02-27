import React, {useEffect} from "react";

export const useVerticalScroll = (scroll: React.RefObject<HTMLElement>) => {
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
        return () => {
            if (scroll.current)
            scroll.current.removeEventListener("wheel", wheel)
        }
    }, [scroll]);
}