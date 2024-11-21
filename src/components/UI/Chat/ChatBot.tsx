import { useState } from 'react';
import ChatItem, { ChatItemProps } from './ChatItem';
import {
    deleteSessionStorage,
    getSessionStorages,
    setSessionStorages,
} from 'utils/Storage/sessionStorage';

interface ChatBotProps {
    onCategorySelect: () => void;
    onCategoryReset: () => void;
    resetChatMessages: () => void; // Add resetChatMessages prop
}

export default function ChatBot({
    onCategorySelect,
    onCategoryReset,
    resetChatMessages, // Destructure resetChatMessages prop
}: ChatBotProps) {
    const date = new Date().toLocaleString();
    const initialMessages: ChatItemProps[] = [
        {
            content: '안녕하세요 🤖',
            date: date,
            chatDirection: 'incoming',
        },
        {
            content: '문의하시려는 카테고리를 선택해주세요',
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
                content: `${value} 문의를 선택하셨군요!`,
                date,
                chatDirection: 'incoming',
            },
            {
                content: '구체적인 내용을 입력해주세요 🤠',
                date,
                chatDirection: 'incoming',
            },
        ]);
        onCategorySelect();
    }

    function showCategoryListAgain() {
        setShowCategories(true);
        setMessages(initialMessages);
        deleteSessionStorage('chatbotCategory');
        onCategoryReset();
        resetChatMessages(); // Call resetChatMessages to reset messages in Chat component
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
                    <button onClick={(e) => selectCategory(e, '이미지 관련')}>
                        이미지 관련
                    </button>
                    <button onClick={(e) => selectCategory(e, '계정 관련')}>
                        계정 관련
                    </button>
                    <button onClick={(e) => selectCategory(e, '사용법 안내')}>
                        사용법 안내
                    </button>
                    <button onClick={(e) => selectCategory(e, '기타')}>
                        기타 문의
                    </button>
                </section>
            ) : (
                <section className="c-chat__chatbot-category">
                    <button onClick={showCategoryListAgain}>
                        다시 선택하기
                    </button>
                </section>
            )}
        </div>
    );
}
