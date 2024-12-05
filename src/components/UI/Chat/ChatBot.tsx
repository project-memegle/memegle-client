import { useEffect, useState } from 'react';
import ChatItem, { ChatItemProps } from './ChatItem';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';
import { useTranslation } from 'react-i18next';
import StorageKeyword from 'Constant/StorageKeyword';

interface ChatBotProps {
    onCategorySelect: (category: string) => void;
    onCategoryReset: () => void;
    resetChatMessages: () => void;
}

export default function ChatBot({
    onCategorySelect,
    onCategoryReset,
    resetChatMessages,
}: ChatBotProps) {
    const { t, i18n } = useTranslation();
    const initialMessages: ChatItemProps[] = [
        {
            content: 'GREETING_CHAT',
            date: new Date().toLocaleString(),
            chatDirection: 'incoming',
        },
        {
            content: 'CHAT_REQUIRED_CAGTEGORY',
            date: new Date().toLocaleString(),
            chatDirection: 'incoming',
        },
    ];

    const [isClicked, setIsClicked] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [messages, setMessages] = useState<ChatItemProps[]>(initialMessages);
    const [chosenCategory, setChosenCategory] = useState('');

    useEffect(() => {
        const chatbotCategory = getSessionStorages(
            StorageKeyword.CHATBOT_CATEGORY
        );

        if (chatbotCategory) {
            // 카테고리만 저장된 경우 초기 메시지 유지
            setMessages(initialMessages);
            return;
        }

        setMessages(initialMessages);
        return;
    }, []);

    useEffect(() => {
        // 언어 변경 시 메시지 재설정
        setMessages((prevMessages) => {
            const chatbotCategory = getSessionStorages(
                StorageKeyword.CHATBOT_CATEGORY
            );
            if (!chatbotCategory) {
                return initialMessages;
            }
            return prevMessages;
        });
        if (chosenCategory) {
            console.log('chosenCateogry: ', chosenCategory);
        }
    }, [i18n.language, t]);

    function selectCategory(
        event: React.MouseEvent<HTMLButtonElement>,
        categoryKey: string
    ) {
        event.preventDefault();
        const categoryValue = t(categoryKey);
        setChosenCategory(t(categoryKey));
        setIsClicked(true);
        setShowCategories(false);
        setSessionStorages({
            key: StorageKeyword.CHATBOT_CATEGORY,
            value: categoryKey,
        });
        console.log('key: ', categoryKey);
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                content: 'CHAT_SELECTED_CAGTEGORY-1',
                additionalContent: categoryValue,
                date: new Date().toLocaleString(),
                chatDirection: 'incoming',
            },
            {
                content: 'CHAT_REQUIRED_CONTENT',
                date: new Date().toLocaleString(),
                chatDirection: 'incoming',
            },
        ]);
        onCategorySelect(categoryKey);
    }

    function showCategoryListAgain() {
        setShowCategories(true);
        setMessages(initialMessages);
        deleteSessionStorage(StorageKeyword.CHATBOT_CATEGORY);
        onCategoryReset();
        resetChatMessages();
    }

    return (
        <div className="c-chat__chatbot">
            <section>
                {messages.map((msg, index) => (
                    <ChatItem
                        key={index}
                        content={
                            msg.additionalContent
                                ? `${t(msg.content)} "${
                                        msg.additionalContent
                                    }" ${t('CHAT_SELECTED_CAGTEGORY-2')}`
                                : t(msg.content)
                        }
                        date={msg.date}
                        chatDirection={msg.chatDirection}
                    />
                ))}
            </section>
            {showCategories ? (
                <section className="c-chat__chatbot-category">
                    {[
                        'CHAT_CAGTEGORY-IMAGE',
                        'CHAT_CAGTEGORY-ACCOUNT',
                        'CHAT_CAGTEGORY-INFO',
                        'CHAT_CAGTEGORY-OTHER',
                    ].map((key) => (
                        <button
                            key={key}
                            onClick={(e) => selectCategory(e, key)}
                        >
                            {t(key)}
                        </button>
                    ))}
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
