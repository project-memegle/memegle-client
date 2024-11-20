import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_ANGER: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 91,
            imageUrl: resolveImagePath('/temp/Anger/anger-01.jpeg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 92,
            imageUrl: resolveImagePath('/temp/Anger/anger-02.png'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 93,
            imageUrl: resolveImagePath('/temp/Anger/anger-03.jpg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 94,
            imageUrl: resolveImagePath('/temp/Anger/anger-04.jpg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 95,
            imageUrl: resolveImagePath('/temp/Anger/anger-05.jpg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 96,
            imageUrl: resolveImagePath('/temp/Anger/anger-06.jpg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_ANGER;
