import chatIcon from '@memegle/assets/icons/ic_chat.svg';

export default function Chat() {
    return (
        <div className="c-chat">
            <button className="c-chat__icon">
                <img src={chatIcon} alt="chat" />
            </button>
        </div>
    );
}
