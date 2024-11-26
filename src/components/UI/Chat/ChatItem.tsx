import formatDate from 'utils/Format/formatDate';

export type ChatItemProps = {
    content: string;
    date: string;
    chatDirection: 'incoming' | 'outgoing';
    additionalContent?: string; 
};

export default function ChatItem({
    content,
    date,
    chatDirection,
    additionalContent,
}: ChatItemProps) {
    return (
        <div className="c-chat__item-container">
            <article className={`c-chat__item c-chat__item-${chatDirection}`}>
                <div
                    className={`c-chat__item-content c-chat__item-${chatDirection}-content`}
                >
                    <p className="c-chat__item-text">
                        {content}
                        {additionalContent && ` "${additionalContent}"`}
                    </p>
                </div>
                <p className="c-chat__item-date">{formatDate(date)}</p>
            </article>
        </div>
    );
}
