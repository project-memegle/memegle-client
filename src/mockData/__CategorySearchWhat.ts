import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_WHAT: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 11,
            imageUrl: resolveImagePath('/temp/what/what-01.webp'),
            imageCategory: 'what',
            createdAt: DATE,
            tagList: ['피글렛', '뭐야', 'piglet', 'huh'],
        },
        {
            id: 12,
            imageUrl: resolveImagePath('/temp/what/what-02.webp'),
            imageCategory: 'what',
            createdAt: DATE,
            tagList: ['푸우', '뭐라고', 'pooh', 'hmm'],
        },
        {
            id: 13,
            imageUrl: resolveImagePath('/temp/what/what-03.webp'),
            imageCategory: 'what',
            createdAt: DATE,
            tagList: ['생선', '스폰지밥', 'awkward'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_WHAT;
