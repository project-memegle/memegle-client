import ChatItem from './ChatItem';

export default function Chat() {
    return (
        <div className="c-chat">
            <div className="main__container">
                <section className="c-chat__section">
                    <ChatItem
                        content={'test1'}
                        date={'2 일 전'}
                        chatDirection="incoming"
                    />
                    <ChatItem
                        content={'test2'}
                        date={'2 일 전'}
                        chatDirection="outgoing"
                    />
                </section>
            </div>
            <form action="" className="c-chat__input c-chat__shadow">
                <label htmlFor="">chat</label>
                <input
                    className="c-input__input"
                    type="text"
                    placeholder="메세지를 입력해주세요"
                />
            </form>
        </div>
    );
}
