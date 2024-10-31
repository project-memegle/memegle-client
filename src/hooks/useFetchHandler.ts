import { useState, useEffect } from 'react';

type UseFetchHandlerOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: BodyInit;
};

function useFetchHandler<T>(
    url: string | T,
    options: UseFetchHandlerOptions = {}
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (typeof url === 'string') {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(
                            `Error ${response.status}: ${response.statusText}`
                        );
                    }
                    const result = await response.json();
                    setData(result);
                } else {
                    // mock 데이터 바로 사용
                    setTimeout(() => {
                        setData(url);
                        setLoading(false);
                    }, 1000);
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
}

export default useFetchHandler;
