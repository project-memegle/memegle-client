import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_BIRTHDAY: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 81,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/birthday/birthday-01.png'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 82,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/birthday/birthday-02.png'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 83,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/birthday/birthday-03.png'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_BIRTHDAY;
