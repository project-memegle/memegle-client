import {
    format,
    isToday,
    isYesterday,
    differenceInDays,
    differenceInYears,
} from 'date-fns';

export default function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
        return '어제 ' + format(date, 'HH:mm');
    } else if (differenceInDays(now, date) < 1) {
        return format(date, 'HH:mm');
    } else if (differenceInDays(now, date) < 365) {
        return format(date, 'M월 d일');
    } else {
        return format(date, 'yyyy년 M월 d일');
    }
}
