import {
    IChat,
    getChatMessages,
    getChats
} from '@/entities/chat/model';
import React from 'react';
import styles from './CurrentChat.module.scss'
import { MessageList } from '@/entities/chat/ui/MessageList';
import { SendMessage } from '@/features/chat';
import { useAppSelector } from '@/shared/lib/hooks';

export const CurrentChat: React.FC = () => {
    const chats: IChat[] = useAppSelector(getChats)
    const messages = useAppSelector(getChatMessages)

    return (
        <>
            {chats.map((chat) => chat.isActive && (
                <section
                    key={chat.id}
                    className={styles.curChat}>
                    {
                        messages &&
                        messages.length > 0 &&
                        <MessageList />
                    }
                    <SendMessage />
                </section>
            ))}
        </>
    );
};
