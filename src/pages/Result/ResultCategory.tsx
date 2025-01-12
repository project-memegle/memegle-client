import { ResultPageForm } from 'components/UI/Result/ResultPageForm';
import { useEffect, useState } from 'react';
import { getImagesByCategory } from 'services/CategoryService';
import { getLastKeywordFromUrl } from 'utils/Event/saveUrl';

export function ResultCategory() {
    const [categoryData, setCategoryData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const lastKeyword = getLastKeywordFromUrl<string>();

        setLoading(true);
        if (typeof lastKeyword === 'string') {
            setSearchText(lastKeyword);
            const fetchData = async () => {
                try {
                    const result = await getImagesByCategory(lastKeyword);
                    setCategoryData(result);
                } catch (error) {
                    setError('Error fetching images');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, []);

    return (
        <ResultPageForm
            results={categoryData}
            loading={loading}
            error={error}
        />
    );
}
