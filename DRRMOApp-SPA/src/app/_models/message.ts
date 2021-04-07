export interface Message {
    id: number;
    senderId: number;
    senderFirstName: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientFirstName: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
