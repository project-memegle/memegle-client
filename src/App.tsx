import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import ChatIcon from 'components/UI/Chat/ChatIcon';
import { useEffect, useState } from 'react';
import { addSearchHistory, getSearchHistory } from 'utils/Storage/localStorage';
import { useAuth } from 'components/auth/ProvideAuth';
import { setupInterceptors } from 'utils/API/fetcher';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>(
        getSearchHistory()
    );
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated !== isAuthenticated) {
            setIsAuthenticated(auth.isAuthenticated);
        }
        // console.log('auth.isAuthenticated', auth.isAuthenticated);
        // console.log('isAuthenticated', isAuthenticated);
    }, [auth.isAuthenticated, isAuthenticated]);

    useEffect(() => {
        setupInterceptors(navigate);
    }, [navigate]);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm, setSearchHistory]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        addSearchHistory(term);
        setSearchHistory([term, ...getSearchHistory()]);
    };

    return (
        <div className="body__container">
            <Header
                searchTerm={searchTerm}
                onSearch={handleSearch}
                isAuthenticated={isAuthenticated}
            />
            <Outlet
                context={{
                    searchTerm,
                    searchHistory,
                    setSearchTerm,
                    isAuthenticated,
                }}
            />
            {isAuthenticated && location.pathname !== '/chat' && <ChatIcon />}
        </div>
    );
}

export default App;
