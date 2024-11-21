import { useState } from 'react';
import ChatBot from 'components/UI/Chat/ChatBot';
import ChatItem from '../components/UI/Chat/ChatItem';

export default function Chat() {
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<
        {
            content: string;
            date: string;
            chatDirection: 'incoming' | 'outgoing';
        }[]
    >([]);
    const date = new Date().toLocaleString();

    function handleCategorySelect() {
        setIsCategorySelected(true);
    }

    function handleCategoryReset() {
        setIsCategorySelected(false);
        setMessages([]); // Reset messages state
    }

    function handleMessageSend(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (message.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { content: message, date, chatDirection: 'outgoing' },
            ]);
            setMessage('');
        }
    }

    function handleEndChat() {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                content: '상담이 종료되었습니다.',
                date,
                chatDirection: 'incoming',
            },
        ]);
        setIsCategorySelected(false);
    }

    return (
        <div className="c-chat">
            <div className="main__container">
                <section className="c-chat__section">
                    <ChatBot
                        onCategorySelect={handleCategorySelect}
                        onCategoryReset={handleCategoryReset}
                        resetChatMessages={() => setMessages([])} // Pass reset function
                    />
                    {messages.map((msg, index) => (
                        <ChatItem
                            key={index}
                            content={msg.content}
                            date={msg.date}
                            chatDirection={msg.chatDirection}
                        />
                    ))}
                    {isCategorySelected && (
                        <div className="c-chat__end-section">
                            <button
                                className="c-chat__end-section-button"
                                onClick={handleEndChat}
                            >
                                상담종료하기
                            </button>
                        </div>
                    )}
                </section>
            </div>
            {isCategorySelected && (
                <form
                    onSubmit={handleMessageSend}
                    className="c-chat__input c-chat__shadow"
                >
                    <label htmlFor="chat">chat</label>
                    <input
                        className="c-input__input"
                        type="text"
                        placeholder="메세지를 입력해주세요"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" name="Submit">
                        <i className="c-icon">send</i>
                    </button>
                </form>
            )}
        </div>
    );
}
