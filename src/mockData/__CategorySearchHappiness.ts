import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_HAPINESS: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 1,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-01.jpg'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 2,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-02.png'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 3,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-03.jpg'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 4,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-04.jpg'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 5,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-05.jpg'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 6,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-06.jpg'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_HAPINESS;
