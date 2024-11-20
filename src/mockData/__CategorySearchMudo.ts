import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_MUDO: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 31,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-01.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 32,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-02.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 33,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-03.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 34,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-04.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 35,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-05.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 36,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-06.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 37,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-07.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 38,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-08.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 39,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-09.jpeg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 310,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-10.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 311,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-11.png'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 312,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-12.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_MUDO;
