import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_HUNGRY: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 41,
            imageUrl: resolveImagePath('/temp/hungry/hungry-01.png'),
            imageCategory: 'hungry',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 42,
            imageUrl: resolveImagePath('/temp/hungry/hungry-02.png'),
            imageCategory: 'hungry',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 43,
            imageUrl: resolveImagePath('/temp/hungry/hungry-03.png'),
            imageCategory: 'hungry',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_HUNGRY;
