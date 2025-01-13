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
            imageUrl: resolveImagePath('/temp/Other/other-01.webp'),
            imageCategory: 'other',
            createdAt: DATE,
            tagList: ['나래언니', '소주', '소주하나', 'soju'],
        },
        {
            id: 42,
            imageUrl: resolveImagePath('/temp/Other/other-02.webp'),
            imageCategory: 'other',
            createdAt: DATE,
            tagList: ['참이슬', '루피', 'soju', 'seal'],
        },
        {
            id: 43,
            imageUrl: resolveImagePath('/temp/Other/other-03.webp'),
            imageCategory: 'other',
            createdAt: DATE,
            tagList: ['김민경', 'food'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_HUNGRY;