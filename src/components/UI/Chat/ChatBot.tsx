import { useState } from 'react';
import ChatItem, { ChatItemProps } from './ChatItem';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import { useTranslation } from 'react-i18next';

interface ChatBotProps {
    onCategorySelect: (category: string) => void;
    onCategoryReset: () => void;
    resetChatMessages: () => void;
}

export default function ChatBot({
    onCategorySelect,
    onCategoryReset,
    resetChatMessages, // Destructure resetChatMessages prop
}: ChatBotProps) {
    const { t } = useTranslation();
    const date = new Date().toLocaleString();
    const initialMessages: ChatItemProps[] = [
        {
            content: `${t('GREETING_CHAT')}🤖`,
            date: date,
            chatDirection: 'incoming',
        },
        {
            content: t('CHAT_REQUIRED_CAGTEGORY'),
            date: date,
            chatDirection: 'incoming',
        },
    ];

    const [isClicked, setIsClicked] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [messages, setMessages] = useState<ChatItemProps[]>(() => {
        const savedMessages = getSessionStorages('chatMessages');
        const chatbotCategory = getSessionStorages('chatbotCategory');
        if (savedMessages) {
            return JSON.parse(savedMessages);
        }

        if (chatbotCategory) {
            return [];
        }

        return initialMessages;
    });

    function selectCategory(
        event: React.MouseEvent<HTMLButtonElement>,
        value: string
    ) {
        event.preventDefault();
        setIsClicked(true);
        setShowCategories(false);
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                content: `${t('CHAT_SELECTED_CAGTEGORY-1')} "${value}" ${t(
                    'CHAT_SELECTED_CAGTEGORY-2'
                )}`,
                date,
                chatDirection: 'incoming',
            },
            {
                content: `${t('CHAT_REQUIRED_CONTENT')}🤠`,
                date,
                chatDirection: 'incoming',
            },
        ]);
        onCategorySelect(value);
    }

    function showCategoryListAgain() {
        setShowCategories(true);
        setMessages(initialMessages);
        deleteSessionStorage('chatbotCategory');
        onCategoryReset();
        resetChatMessages(); 
    }

    return (
        <div className="c-chat__chatbot">
            <section>
                {messages.map((msg, index) => (
                    <ChatItem
                        key={index}
                        content={msg.content}
                        date={msg.date}
                        chatDirection={msg.chatDirection}
                    />
                ))}
            </section>
            {showCategories ? (
                <section className="c-chat__chatbot-category">
                    <button
                        onClick={(e) =>
                            selectCategory(e, t('CHAT_CAGTEGORY-IMAGE'))
                        }
                    >
                        {t('CHAT_CAGTEGORY-IMAGE')}
                    </button>
                    <button
                        onClick={(e) =>
                            selectCategory(e, t('CHAT_CAGTEGORY-ACCOUNT'))
                        }
                    >
                        {t('CHAT_CAGTEGORY-ACCOUNT')}
                    </button>
                    <button
                        onClick={(e) =>
                            selectCategory(e, t('CHAT_CAGTEGORY-INFO'))
                        }
                    >
                        {t('CHAT_CAGTEGORY-INFO')}
                    </button>
                    <button
                        onClick={(e) =>
                            selectCategory(e, t('CHAT_CAGTEGORY-OTHER'))
                        }
                    >
                        {t('CHAT_CAGTEGORY-OTHER')}
                    </button>
                </section>
            ) : (
                <section className="c-chat__chatbot-category">
                    <button onClick={showCategoryListAgain}>
                        {t('CHAT_SELECT_AGAIN')}
                    </button>
                </section>
            )}
        </div>
    );
}
