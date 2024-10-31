import NotificationItem from './NotificationItem';

export default function Notification() {
    return (
        <section className="c-notification">
            <NotificationItem
                content={'이미지가 등록되었습니다'}
                date={'1 일 전'}
            />{' '}
            <NotificationItem
                content={'이미지가 등록이 반려되었습니다'}
                date={'2 일 전'}
            />
        </section>
    );
}
