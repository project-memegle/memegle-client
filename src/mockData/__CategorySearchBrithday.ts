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
            imageUrl: resolveImagePath('/temp/birthday/birthday-01.webp'),
            imageCategory: 'birthday',
            createdAt: DATE,
            tagList: ['생일축하해', '선물은나야', 'presentIsMe'],
        },
        {
            id: 82,
            imageUrl: resolveImagePath('/temp/birthday/birthday-02.webp'),
            imageCategory: 'birthday',
            createdAt: DATE,
            tagList: ['고양이', 'cat', 'kitty'],
        },
        {
            id: 83,
            imageUrl: resolveImagePath('/temp/birthday/birthday-03.webp'),
            imageCategory: 'birthday',
            createdAt: DATE,
            tagList: ['노주현', '생일케익', 'happyman'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_BIRTHDAY;
