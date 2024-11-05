import { useEffect } from 'react';
import CategorySection from '../components/UI/Category/CategorySection';
import { getNotification } from 'services/NotificationService';

export default function HomePage() {
    useEffect(() => {
        getNotification();
    });
    return (
        <main className="home__main">
            <CategorySection />
        </main>
    );
}
