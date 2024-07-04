import {
    IChatFeatureProps,
    IMessage,
    getChatMessages,
    getChatsByType,
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

export const CurrentChat: React.FC<IChatFeatureProps> = ({chatType}) => {
    const chats = useAppSelector((state) => 
        getChatsByType(state, chatType))
    const chatMessages = useAppSelector((state) =>
        getChatMessages(state, chatType)) as IMessage[]
    const displayedField = useAppSelector((state) => 
        getDisplayedField(state, chatType))

    return (
        <>
            {chats.map((chat) => chat.isActive && (
                <section
                    key={chat.id}
                    className={styles.curChat}>
                    {
                        chatMessages &&
                        chatMessages.length > 0 &&
                        <MessageList chatType={chatType} />
                    }
                    <div className={styles.curChat_bottom}>
                        <div className={styles.curChat_settings}>
                            <ChangeDisplayedField chatType={chatType}/>
                            <ChangeMemoryLength chatType={chatType} />
                        </div>
                        {
                            displayedField && displayedField === 'request'
                                ? <SendMessage chatType={chatType} />
                                : <EditPrompt chatType={chatType}/>
                        }
                    </div>
                </section>
            ))}
        </>
    );
};
