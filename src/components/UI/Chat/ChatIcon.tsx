import chatIcon from '@memegle/assets/icons/ic_chat.svg';
import { useNavigate } from 'react-router-dom';

export default function ChatIcon() {
    const navigate = useNavigate();
    function iconClickHandler() {
        navigate('/chat');
    }

    return (
        <div className="c-chat">
            <button onClick={iconClickHandler} className="c-chat__icon">
                <img src={chatIcon} alt="chat" />
            </button>
        </div>
    );
}
