import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_MUDO: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 31,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-01.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '문잠가', 'funnyman'],
        },
        {
            id: 32,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-02.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '뭐하는거야', 'glassesman', 'soju'],
        },
        {
            id: 33,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-03.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['길', '망했어요', 'screaming', 'soju'],
        },
        {
            id: 34,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-04.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '말잇못', 'glassesman', 'funnyman'],
        },
        {
            id: 35,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-05.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['박명수', '먹을거', 'funnnyman'],
        },
        {
            id: 36,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-06.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['박명수', '무관심', 'noInterests', 'funnnyman'],
        },
        {
            id: 37,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-07.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['박명수', '울컥', 'babo'],
        },
        {
            id: 38,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-08.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['노홍철', '웬방해', 'funnyman', 'noDisturb'],
        },
        {
            id: 39,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-09.jpeg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['박명수', '할수있다', 'funnyman', 'icandoit'],
        },
        {
            id: 310,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-10.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '술만마셨어', 'funnyman', 'soju'],
        },
        {
            id: 311,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-11.png'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['정형돈', '거리두두자', 'distance'],
        },
        {
            id: 312,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-12.jpg'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['유재석', '지겨움', 'boring'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_MUDO;
