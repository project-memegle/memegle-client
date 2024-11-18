import ChatBot from 'components/UI/Chat/ChatBot';
import ChatItem from '../components/UI/Chat/ChatItem';
import { useState } from 'react';

export default function Chat() {
    const [isCategorySelected, setIsCategorySelected] = useState(false);

    function handleCategorySelect() {
        setIsCategorySelected(true);
    }
    function handleCategoryReset() {
        setIsCategorySelected(false);
    }
    return (
        <div className="c-chat">
            <div className="main__container">
                <section className="c-chat__section">
                    <ChatBot
                        onCategorySelect={handleCategorySelect}
                        onCategoryReset={handleCategoryReset}
                    />
                    {/* <ChatItem
                        content={'test1'}
                        date={'2 일 전'}
                        chatDirection="incoming"
                    /> */}
                    {/* <ChatItem
                        content={'test2'}
                        date={'2 일 전'}
                        chatDirection="outgoing"
                    /> */}
                </section>
            </div>
            {isCategorySelected && (
                <form action="" className="c-chat__input c-chat__shadow">
                    <label htmlFor="">chat</label>
                    <input
                        className="c-input__input"
                        type="text"
                        placeholder="메세지를 입력해주세요"
                    />
                    <button type="submit" name="Submit">
                        <i className="c-icon">send</i>
                    </button>
                </form>
            )}
        </div>
    );
}
