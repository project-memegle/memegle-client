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
            id: 1,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-01.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 2,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-02.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 3,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-03.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 4,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-04.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 5,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-05.jpg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 6,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-06.jpg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 7,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-07.jpg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 8,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-08.jpg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 9,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-09.jpeg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 10,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-10.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 11,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-11.png'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 12,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-12.jpg'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_MUDO;
