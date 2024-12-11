import { AxiosError } from 'axios';
import { get } from 'utils/API/fetcher';
import { handleApiError } from 'utils/API/handleApiError';
import {
    NotificationSectionDTO,
    NotificationStateSectionDTO,
} from './dto/NotificationDto';

export const GET_NOTIFICATION_STATE_URL = '/notifications/state';
export const GET_NOTIFICATION_LIST_URL = '/notifications/list';

export async function getNotificationState(): Promise<
    NotificationStateSectionDTO | undefined
> {
    try {
        const response = await get<NotificationStateSectionDTO>(
            GET_NOTIFICATION_STATE_URL
        );
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}

export async function getNotificationList(): Promise<
    NotificationSectionDTO | undefined
> {
    try {
        const response = await get<NotificationSectionDTO>(
            GET_NOTIFICATION_LIST_URL
        );
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
    }
}
