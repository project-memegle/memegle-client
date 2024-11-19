import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_SAD: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 71,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-01.jpg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 72,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-02.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 73,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-03.jpg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 74,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-04.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 75,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-05.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 76,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-06.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 77,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-07.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 78,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-08.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 79,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-09.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 710,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-10.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 711,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-11.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 712,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Sad/sad-12.jpeg'
            ),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_SAD;
