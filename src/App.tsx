import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Chat from 'components/UI/Chat/Chat';

function App() {
    return (
        <div className="body__container">
            <Header />
            <Outlet />
            <Chat />
        </div>
    );
}

export default App;
