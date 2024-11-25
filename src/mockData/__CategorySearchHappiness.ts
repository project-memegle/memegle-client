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
            id: 51,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-01.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 52,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-02.png'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 53,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-03.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 54,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-04.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 55,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-05.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 56,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-06.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_HAPINESS;
