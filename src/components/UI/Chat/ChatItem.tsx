import formatDate from 'utils/Event/formatDate';

export type ChatItemProps = {
    content: string;
    date: string;
    chatDirection: 'incoming' | 'outgoing';
};

export default function ChatItem({
    content,
    date,
    chatDirection,
}: ChatItemProps) {
    return (
        <div className="c-chat__item-container">
            <article className={`c-chat__item c-chat__item-${chatDirection}`}>
                <div
                    className={`c-chat__item-content c-chat__item-${chatDirection}-content`}
                >
                    <p className="c-chat__item-text">{content}</p>
                </div>
                <p className="c-chat__item-date">{formatDate(date)}</p>
            </article>
        </div>
    );
}
