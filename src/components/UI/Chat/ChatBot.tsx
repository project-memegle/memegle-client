import ChatItem from './ChatItem';

export default function ChatBot() {
    const greeting1 = '안녕하세요 🤖';
    const greeting2 = '문의하시려는 카테고리를 선택해주세요';

    return (
        <div className="c-chat__chatbot">
            <section>
                <ChatItem
                    content={greeting1}
                    date={'2 일 전'}
                    chatDirection="incoming"
                />{' '}
                <ChatItem
                    content={greeting2}
                    date={'2 일 전'}
                    chatDirection="incoming"
                />
            </section>
            <section className="c-chat__chatbot-category">
                <button>이미지 관련</button>
                <button>계정 관련</button>
                <button>사용법 안내</button>
                <button>고객센터 연락처</button>
                <button>점심 메뉴 추천</button>
                <button>기타문의</button>
            </section>
        </div>
    );
}
