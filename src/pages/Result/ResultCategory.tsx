import { searchByCategory } from 'services/CategoryService';
import { ResultCommon } from './ResultCommon';

export function ResultCategory() {
    return <ResultCommon searchBy={searchByCategory} />;
}