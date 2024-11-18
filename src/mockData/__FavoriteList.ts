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
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/birthday/birthday-02.png'
            ),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 52,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Happiness/happiness-01.jpg'
            ),
            imageCategory: 'happiness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 23,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Tired/tired-01.jpeg'
            ),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 14,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/what/what-01.jpeg'
            ),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 65,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/flex/flex-01.jpeg'
            ),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 76,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-01.jpeg'
            ),
            imageCategory: 'digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 37,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Mudo/mudo-01.webp'
            ),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 98,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Anger/anger-01.jpeg'
            ),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 49,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/hungry/hungry-02.png'
            ),
            imageCategory: 'hunger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_FAVORITE_LIST;
