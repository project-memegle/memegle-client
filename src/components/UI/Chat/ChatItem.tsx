type chatDirection = 'incoming' | 'outgoing';

type ChatItemProps = {
    content: string;
    date: string;
    chatDirection: chatDirection;
};
export default function ChatItem({
    content,
    date,
    chatDirection,
}: ChatItemProps) {
    return (
        <div>
            <article className={`c-chat__item c-chat__item-${chatDirection}`}>
                <div
                    className={`c-chat__item-content c-chat__item-${chatDirection}-content`}
                >
                    <p className="c-chat__item-text">{content}</p>
                </div>
                <p className="c-chat__item-date">{date}</p>
            </article>
        </div>
    );
}
