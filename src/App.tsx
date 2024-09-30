import { Outlet } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import SideBar from './components/UI/SideBar/SideBar';

function App() {
    return (
        <div>
            <Header />
            <SideBar />
            <Outlet />
        </div>
    );
}

export default App;
