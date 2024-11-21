import { useState } from 'react';
import ChatBot from 'components/UI/Chat/ChatBot';
import ChatItem from '../components/UI/Chat/ChatItem';
import { ChatItemDTO } from 'services/dto/ChatDto';
import { postChat } from 'services/ChatService';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';

export default function Chat() {
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [message, setMessage] = useState('');

    const [category, setCategory] = useState('');

    const [messages, setMessages] = useState<
        {
            content: string;
            date: string;
            chatDirection: 'incoming' | 'outgoing';
        }[]
    >([]);
    const date = new Date().toLocaleString();

    function handleCategorySelect(selectedCategory: string) {
        setIsCategorySelected(true);
        setCategory(selectedCategory);
    }

    function handleCategoryReset() {
        setIsCategorySelected(false);
        setMessages([]);
        setCategory('');
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

    async function handleEndChat() {
        const allMessages = messages.map((msg) => `${msg.content}`).join('\n');
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                content: '상담이 종료되었습니다.',
                date,
                chatDirection: 'incoming',
            },
        ]);
        setIsCategorySelected(false);
        const userId = getSessionStorages(StorageKeyword.USER_ID);

        if (!allMessages) {
            return;
        }
        if (userId) {
            const chatData: ChatItemDTO = {
                loginId: userId,
                content: allMessages,
                category: category,
            };
            await postChat(chatData);
        }
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
