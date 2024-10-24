import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import ChatIcon from 'components/UI/Chat/ChatIcon';

function App() {
    return (
        <div className="body__container">
            <Header />
            <Outlet />
            <ChatIcon />
        </div>
    );
}

export default App;
