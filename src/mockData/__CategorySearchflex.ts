import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_FLEX: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 61,
            imageUrl: resolveImagePath('/temp/flex/flex-01.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['플렉스', '카드긁기', 'card'],
        },
        {
            id: 62,
            imageUrl: resolveImagePath('/temp/flex/flex-02.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['저거사자', '아기사자', 'lion'],
        },
        {
            id: 63,
            imageUrl: resolveImagePath('/temp/flex/flex-03.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['돈없음', '전재산탕진', 'noMoney', 'emptyWallet'],
        },
        {
            id: 64,
            imageUrl: resolveImagePath('/temp/flex/flex-04.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['전재산천원', '돈없음', '1000', 'nomoney'],
        },
        {
            id: 65,
            imageUrl: resolveImagePath('/temp/flex/flex-05.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['페페', '개츠비', 'pepe', 'gatsby'],
        },
        {
            id: 66,
            imageUrl: resolveImagePath('/temp/flex/flex-06.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['일어나', '돈벌자', 'wakeUp', 'makeMoney'],
        },
        {
            id: 67,
            imageUrl: resolveImagePath('/temp/flex/flex-07.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            tagList: ['돈냄새', '박명수', 'money', 'funnyMan'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_FLEX;
