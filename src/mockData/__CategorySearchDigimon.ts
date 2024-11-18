import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_DIGIMON: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 1,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-01.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 2,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-02.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 3,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-03.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 4,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-04.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 5,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-05.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 6,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-06.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 7,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-07.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 8,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-08.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 9,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-09.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 10,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-10.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 11,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-11.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
    ],
};

export default MOCK_CATEGORY_RESULT_DIGIMON;
