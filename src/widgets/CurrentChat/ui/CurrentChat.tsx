import {
    IChat,
    getChatMessages,
    getChats,
    getDisplayedField
} from '@/entities/chat/model';
import React from 'react';
import styles from './CurrentChat.module.scss'
import { 
    ChangeDisplayedField, 
    ChangeMemoryLength, 
    EditPrompt, 
    SendMessage 
} from '@/features/chat';
import { useAppSelector } from '@/shared/lib/hooks';
import { MessageList } from '@/entities/chat/ui';

export const CurrentChat: React.FC = () => {
    const chats: IChat[] = useAppSelector(getChats)
    const messages = useAppSelector(getChatMessages)
    const displayedField = useAppSelector(getDisplayedField)

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
                    <div className={styles.curChat_bottom}>
                        <div className={styles.curChat_settings}>
                            <ChangeDisplayedField />
                            <ChangeMemoryLength />
                        </div>
                        {
                            displayedField && displayedField === 'request'
                                ? <SendMessage />
                                : <EditPrompt />
                        }
                    </div>
                </section>
            ))}
        </>
    );
};
