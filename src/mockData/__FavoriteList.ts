import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_FAVORITE_LIST: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 81,
            imageUrl: resolveImagePath('/temp/birthday/birthday-02.webp'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['고양이', 'cat', 'kitty'],
        },
        {
            id: 52,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-01.webp'),
            imageCategory: 'happiness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['전광렬', '노래부르기', 'singingman', 'happyman'],
        },
        {
            id: 23,
            imageUrl: resolveImagePath('/temp/Tired/tired-01.webp'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['고양이', '시무룩', 'sadkitten', 'sadCat'],
        },
        {
            id: 14,
            imageUrl: resolveImagePath('/temp/what/what-01.webp'),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['피글렛', '뭐야', 'piglet', 'huh'],
        },
        {
            id: 65,
            imageUrl: resolveImagePath('/temp/flex/flex-01.webp'),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['플렉스', '카드긁기', 'card'],
        },
        {
            id: 37,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-01.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '문잠가', 'funnyman'],
        },
        {
            id: 98,
            imageUrl: resolveImagePath('/temp/Anger/anger-01.webp'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['angryman', '돌팔매', '사라져라'],
        },
        {
            id: 49,
            imageUrl: resolveImagePath('/temp/hungry/hungry-02.webp'),
            imageCategory: 'hunger',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['참이슬', '루피', 'soju', 'seal'],
        },
    ],
};

export default MOCK_FAVORITE_LIST;
