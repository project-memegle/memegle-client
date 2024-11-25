import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { getNotificationList } from 'services/NotificationService';
import { useTranslation } from 'react-i18next';

export default function Notification() {
    const { t } = useTranslation();

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
                    <h2>{t('NOTIFICATION-empty')} 🤖</h2>
                </section>
            )}
        </section>
    );
}
