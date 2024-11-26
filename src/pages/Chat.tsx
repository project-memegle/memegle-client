import { useEffect, useState } from 'react';
import ChatBot from 'components/UI/Chat/ChatBot';
import ChatItem from '../components/UI/Chat/ChatItem';
import { ChatItemDTO } from 'services/dto/ChatDto';
import { postChat } from 'services/ChatService';
import { getSessionStorages } from 'utils/Storage/sessionStorage';
import StorageKeyword from 'Constant/StorageKeyword';
import { useTranslation } from 'react-i18next';

export default function Chat() {
    const { t, i18n } = useTranslation();
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [message, setMessage] = useState('');

    const [category, setCategory] = useState('');

    const [messages, setMessages] = useState<
        {
            contentKey: string; 
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
                { contentKey: message, date, chatDirection: 'outgoing' },
            ]);
            setMessage('');
        }
    }

    async function handleEndChat() {
        const allMessages = messages
            .map((msg) => `${msg.contentKey}`)
            .join('\n');
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                contentKey: 'COMPLETED_CHAT-1',
                date,
                chatDirection: 'incoming',
            },
            {
                contentKey: 'COMPLETED_CHAT-2',
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

    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages]);
    }, [i18n.language]);

    return (
        <div className="c-chat">
            <div className="main__container">
                <section className="c-chat__section">
                    <ChatBot
                        onCategorySelect={handleCategorySelect}
                        onCategoryReset={handleCategoryReset}
                        resetChatMessages={() => setMessages([])} 
                    />
                    {messages.map((msg, index) => (
                        <ChatItem
                            key={index}
                            content={t(msg.contentKey)} 
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
                                {t('COMPLETE_CHAT')}
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
                        placeholder={t('REQUIRED_MESSAGE')}
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
