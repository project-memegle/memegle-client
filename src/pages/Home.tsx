import { useEffect } from 'react';
import CategorySection from '../components/UI/Category/CategorySection';
import { getNotification } from 'services/NotificationService';

export default function HomePage() {
    useEffect(() => {
        //todo : 완성되면 주석풀기
        // getNotification();
    });
    return (
        <main className="home__main">
            <CategorySection />
        </main>
    );
}
