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
            id: 61,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-01.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 62,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-02.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 63,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-03.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 64,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-04.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 65,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-05.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 66,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-06.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 67,
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
