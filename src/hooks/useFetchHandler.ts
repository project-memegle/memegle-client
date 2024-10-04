import { useState, useEffect } from 'react';

function useFetchHandler<T>(url: string | T) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (typeof url === 'string') {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setData(result);
                } else {
                    setTimeout(() => {
                        setData(url);
                        setLoading(false);
                    }, 1000);
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                if (typeof url === 'string') {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetchHandler;
