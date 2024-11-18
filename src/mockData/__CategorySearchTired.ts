import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_TIREDNESS: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 1,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-01.jpeg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 2,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-02.jpeg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 3,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-03.jpg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 4,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-04.jpg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 5,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-05.jpg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_TIREDNESS;
