import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import ChatIcon from 'components/UI/Chat/ChatIcon';
import { useEffect, useState } from 'react';
import { addSearchHistory, getSearchHistory } from 'utils/Storage/localStorage';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>(
        getSearchHistory()
    );
    const location = useLocation();

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        addSearchHistory(term);
        setSearchHistory([term, ...getSearchHistory()]);
    };

    return (
        <div className="body__container">
            <Header searchTerm={searchTerm} onSearch={handleSearch} />
            <Outlet context={{ searchTerm, searchHistory, setSearchTerm }} />
            {location.pathname !== '/chat' && <ChatIcon />}
        </div>
    );
}

export default App;
