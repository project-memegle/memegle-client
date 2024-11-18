import { CategoryResultSectionDTO } from 'services/dto/ResultDto';

const DATE = new Date().toISOString();

const resolveImagePath = (path: string) =>
    new URL(path, import.meta.url).pathname;

export const MOCK_CATEGORY_LIST: CategoryResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 1,
            categoryName: '생일',
            imageCategory: 'birhtday',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/birthday/birthday-01.png'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 2,
            categoryName: '행복함',
            imageCategory: 'happiness',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-01.jpg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 3,
            categoryName: '피곤함',
            imageCategory: 'tiredness',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-01.jpeg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 4,
            categoryName: '어이없음',
            imageCategory: 'what',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-01.jpeg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 5,
            categoryName: '소비',
            imageCategory: 'flex',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-01.jpeg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 6,
            categoryName: '디지몬',
            imageCategory: 'digimon',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-01.jpeg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 7,
            categoryName: '무한도전',
            imageCategory: 'mudo',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-01.webp'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 8,
            categoryName: '분노',
            imageCategory: 'anger',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/Anger/anger-01.jpeg'
            ),
            lastMemeImageRegistTime: DATE,
        },
        {
            id: 9,
            categoryName: '배고픔',
            imageCategory: 'hunger',
            titleImageUrl: resolveImagePath(
                '/src/assets/images/temp/hungry/hungry-02.png'
            ),
            lastMemeImageRegistTime: DATE,
        },
    ],
};
