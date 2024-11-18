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
            id: 71,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-01.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 72,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-02.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 73,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-03.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 74,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-04.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 75,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-05.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 76,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-06.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 77,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-07.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 78,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-08.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 79,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-09.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 710,
            imageUrl: resolveImagePath(
                '/src/assets/images/temp/Digimon/digimon-10.jpeg'
            ),
            imageCategory: 'Digimon',
            createdAt: DATE,
            modifiedAt: DATE,
        },
        {
            id: 711,
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
