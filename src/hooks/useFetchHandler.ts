import { useState, useEffect } from 'react';

function useFetchHandler<T>(input: string | T) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (typeof input === 'string') {
                    const response = await fetch(input);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setData(result);
                } else {
                    // Simulate a delay for mock data
                    setTimeout(() => {
                        setData(input);
                        setLoading(false);
                    }, 1000);
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                if (typeof input === 'string') {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [input]);

    return { data, loading, error };
}

export default useFetchHandler;
