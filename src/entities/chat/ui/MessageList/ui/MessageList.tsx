import React from 'react';
import styles from './MessageList.module.scss'
import { MessageLoader } from '@/shared/ui/loaders';
import {
    IMessage,
    getChatMessages,
    getGPTTyping
} from '@/entities/chat/model';
import { Message } from '../../Message';
import { useAppSelector } from '@/shared/lib/hooks';

export const MessageList: React.FC = () => {
    const chatMessages = useAppSelector(getChatMessages) as IMessage[]
    const isGPTTyping = useAppSelector(getGPTTyping) as boolean
    const query = useAppSelector(state => state.chats.query)

    const filteredMessages = chatMessages
        .filter((message) => message.content
            .toLowerCase()
            .includes(query.toLowerCase()))

    return (
        <nav className={styles.messageList}>
            {filteredMessages.map((message, index) => (
                <Message
                    message={message}
                    key={index}
                />
            ))}
            {isGPTTyping &&
                <MessageLoader />
            }
        </nav>
    );
};
