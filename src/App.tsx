import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import ChatIcon from 'components/UI/Chat/ChatIcon';
import { useEffect, useState } from 'react';
import { addSearchHistory, getSearchHistory } from 'utils/localStorage';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>(
        getSearchHistory()
    );

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        addSearchHistory(term);
        setSearchHistory(getSearchHistory());
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
