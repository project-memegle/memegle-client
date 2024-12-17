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
            id: 21,
            imageUrl: resolveImagePath('/temp/Tired/tired-01.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['고양이', '시무룩', 'sadkitten', 'sadCat'],
        },
        {
            id: 22,
            imageUrl: resolveImagePath('/temp/Tired/tired-02.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['펭수', 'penguin'],
        },
        {
            id: 23,
            imageUrl: resolveImagePath('/temp/Tired/tired-03.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['홍진경', '나너무힘들어', 'funnylady', 'mustache'],
        },
        {
            id: 24,
            imageUrl: resolveImagePath('/temp/Tired/tired-04.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['정준하', '여기까지다', 'funnyman', 'sweaty'],
        },
        {
            id: 25,
            imageUrl: resolveImagePath('/temp/Tired/tired-05.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['노홍철', '포기하고싶어요', 'funnyman', 'givingup'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_TIREDNESS;
