import {useState} from 'react';

type FetchingFunction = (...args: any) =>Promise<any>;

type UseFetchingResult = [(...args: any) => void, boolean, string];

export const useFetching = (callback: FetchingFunction): UseFetchingResult => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error];
};