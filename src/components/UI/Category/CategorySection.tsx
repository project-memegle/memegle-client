import { useState } from 'react';
import CategoryItem from '../Category/CategoryItem';
import axios from 'axios';
import ValidationMessages from 'components/Validations/ValidationMessages';

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
                if (axios.isAxiosError(error)) {
                    switch (error.response?.status) {
                        case 40000:
                            setMessage(ValidationMessages.INVALID_FORM);
                            break;
                        case 40001:
                            setMessage(ValidationMessages.INVALID_FORM);
                            break;
                        case 40100:
                            setMessage(ValidationMessages.INVALID_USER);
                            break;
                        case 50000:
                            setMessage(ValidationMessages.SERVER_ERROR);
                            break;
                        default:
                            setMessage(ValidationMessages.UNKNOWN_ERROR);
                            break;
                    }
                } else {
                    setMessage(ValidationMessages.UNKNOWN_ERROR);
                }
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
        </section>
    );
}
