type NotificationItemProps = {
    content: string;
    date: string;
};

export default function NotificationItem({
    content,
    date,
}: NotificationItemProps) {
    return (
        <article className="c-notification__item new">
            <p>{content}</p>
            <p className="c-notification__item-date">{date}</p>
        </article>
    );
}
