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
        <article className={`c-chat__item ${chatDirection}`}>
            <p className="${chatDirection}-content">{content}</p>
            <p className="c-chat__item-date">{date}</p>
        </article>
    );
}
