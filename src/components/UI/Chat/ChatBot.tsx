import { useState } from 'react';
import ChatItem from './ChatItem';

export default function ChatBot() {
    const date = new Date().toLocaleString();
    const [isCliked, setIsClick] = useState(false);
    const [messages, setMessages] = useState([
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
    ]);

    function selectCategory(
        event: React.MouseEvent<HTMLButtonElement>,
        value: string
    ) {
        event.preventDefault();
        setIsClick(true);
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
            {!isCliked && (
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
            )}
        </div>
    );
}
