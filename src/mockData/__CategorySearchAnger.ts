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
            imageUrl: resolveImagePath('/temp/Anger/anger-01.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['angryman', '돌팔매', '사라져라'],
        },
        {
            id: 92,
            imageUrl: resolveImagePath('/temp/Anger/anger-02.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['참기', 'patience', '참는중'],
        },
        {
            id: 93,
            imageUrl: resolveImagePath('/temp/Anger/anger-03.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['노려보기', 'staring', '눈빛'],
        },
        {
            id: 94,
            imageUrl: resolveImagePath('/temp/Anger/anger-04.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['마동석', 'fist', '주먹', 'DonLee'],
        },
        {
            id: 95,
            imageUrl: resolveImagePath('/temp/Anger/anger-05.jpg'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['마동석', 'fist', '주먹', 'DonLee'],
        },
        {
            id: 96,
            imageUrl: resolveImagePath('/temp/Anger/anger-06.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            tagList: ['등짝스매싱', 'smashing', 'basketball'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_ANGER;
