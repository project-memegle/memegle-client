import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { getNotificationList } from 'services/NotificationService';

export default function Notification() {
    const [messages, setMessages] = useState<
        {
            content: string;
            date: string;
        }[]
    >([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getNotificationList();
            if (response && response.results.length > 0) {
                setMessages(response.results);
                return;
            }
            setMessages([]);

            fetchNotifications();
        };
    }, []);

    return (
        <section className="c-notification">
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <NotificationItem
                        key={index}
                        content={msg.content}
                        date={msg.date}
                    />
                ))
            ) : (
                <section className="c-result__emtpy">
                    <h2>도착한 알람이 없어요 🤖</h2>
                </section>
            )}
        </section>
    );
}
