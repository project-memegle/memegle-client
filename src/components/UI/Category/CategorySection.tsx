import { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import axios, { AxiosError } from 'axios';
import { handleApiError } from 'utils/handleApiError';

export default function CategorySection() {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');

    useState(() => {
        axios
            .get('/images/category')
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
                handleApiError(error as AxiosError, setMessage);
            });
    });

    return (
        <section className="category__section">
            <CategoryItem category="favorite" />
            <CategoryItem category="mudo" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
            <CategoryItem category="temp1" />
            <CategoryItem category="temp2" />
            <CategoryItem category="favorite" />
            <CategoryItem category="mudo" />
            <CategoryItem category="digiMon" />
            <CategoryItem category="gif" />
        </section>
    );
}
