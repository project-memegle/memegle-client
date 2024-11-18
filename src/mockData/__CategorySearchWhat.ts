import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_WHAT: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 11,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-01.jpeg'
            ),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 12,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-02.jpg'
            ),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 13,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-03.png'
            ),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 14,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-04.jpg'
            ),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_WHAT;
