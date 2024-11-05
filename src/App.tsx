import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import ChatIcon from 'components/UI/Chat/ChatIcon';
import { useEffect, useState } from 'react';
import { addSearchHistory, getSearchHistory } from 'utils/Storage/localStorage';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>(
        getSearchHistory()
    );
    const [searchData, setSearchData] = useState<{
        term: string;
        source: 'header' | 'search';
    } | null>(null);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    const handleSearch = (term: string, source: 'header' | 'search') => {
        setSearchTerm(term);
        addSearchHistory(term);
        setSearchHistory(getSearchHistory());
        setSearchData({ term, source });
        
        // 검색 출처에 따라 다르게 처리
        if (source === 'header') {
            console.log('Header에서 검색 실행:', term);
            // Header에서만 필요한 추가 로직 (예: 특정 API 호출)
        } else if (source === 'search') {
            console.log('Search 컴포넌트에서 검색 실행:', term);
            // Search에서만 필요한 추가 로직
        }
    };
    return (
        <div className="body__container">
            <Header searchTerm={searchTerm} onSearch={handleSearch} />
            <Outlet context={{ searchTerm, searchHistory }} />
            <ChatIcon />
        </div>
    );
}

export default App;
