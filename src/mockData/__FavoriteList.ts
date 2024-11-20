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
            imageUrl: resolveImagePath('/temp/birthday/birthday-02.png'),
            imageCategory: 'birhtday',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 52,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-01.jpg'),
            imageCategory: 'happiness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 23,
            imageUrl: resolveImagePath('/temp/Tired/tired-01.jpeg'),
            imageCategory: 'tiredness',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 14,
            imageUrl: resolveImagePath('/temp/what/what-01.jpeg'),
            imageCategory: 'what',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 65,
            imageUrl: resolveImagePath('/temp/flex/flex-01.jpeg'),
            imageCategory: 'flex',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 76,
            imageUrl: resolveImagePath('/temp/Digimon/digimon-01.jpeg'),
            imageCategory: 'digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 37,
            imageUrl: resolveImagePath('/temp/Mudo/mudo-01.webp'),
            imageCategory: 'mudo',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 98,
            imageUrl: resolveImagePath('/temp/Anger/anger-01.jpeg'),
            imageCategory: 'anger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 49,
            imageUrl: resolveImagePath('/temp/hungry/hungry-02.png'),
            imageCategory: 'hunger',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_FAVORITE_LIST;
