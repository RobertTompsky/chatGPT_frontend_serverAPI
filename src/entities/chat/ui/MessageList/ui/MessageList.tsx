import React from 'react';
import styles from './MessageList.module.scss'
import { MessageLoader } from '@/shared/ui/loaders';
import {
    IMessage,
    getChatMessages,
    getChatAIProcessing,
    IChatFeatureProps
} from '@/entities/chat/model';
import { useAppSelector } from '@/shared/lib/hooks';
import { Message } from '../..';

export const MessageList: React.FC<IChatFeatureProps> = ({chatType}) => {
    const chatMessages = useAppSelector((state) =>
        getChatMessages(state, chatType)) as IMessage[]
    const isAIProcessing = useAppSelector(getChatAIProcessing) as boolean
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
            {isAIProcessing &&
                <MessageLoader />
            }
        </nav>
    );
};