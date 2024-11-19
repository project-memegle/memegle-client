export interface NotificationSectionDTO {
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: NotificationItemDTO[];
}

export interface NotificationItemDTO {
    title: string;
    content: string;
    date: string;
    isRead: boolean;
}

export interface NotificationStateSectionDTO {
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: NotificationStateDTO[];
}

export interface NotificationStateDTO {
    isUnReadNotification: boolean;
}
