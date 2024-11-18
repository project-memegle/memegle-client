import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_FLEX: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 1,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-01.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 2,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-02.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 3,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-03.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 4,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-04.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 5,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-05.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 6,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-06.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 7,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-07.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_FLEX;
