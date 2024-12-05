import { searchByTag } from 'services/TagService';
import { ResultCommon } from './ResultCommon';

export function ResultTag() {
    return <ResultCommon searchBy={searchByTag} />;
}
