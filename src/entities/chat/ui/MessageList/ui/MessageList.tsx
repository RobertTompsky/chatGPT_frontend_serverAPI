import React, { useRef } from 'react';
import styles from './MessageList.module.scss'
import { TextLoader } from '@/shared/ui/loaders';
import {
    IMessage,
    getChatMessages,
    getChatAIProcessing,
    IChatFeatureProps
} from '@/entities/chat/model';
import { 
    useAppSelector, 
    useScrollToBottom 
} from '@/shared/lib/hooks';
import { Message } from '../..';

export const MessageList: React.FC<IChatFeatureProps> = ({chatType}) => {
    const messageListRef = useRef<HTMLElement>(null)

    useScrollToBottom(messageListRef)

    const chatMessages = useAppSelector((state) =>
        getChatMessages(state, chatType)) as IMessage[]
    const isAIProcessing = useAppSelector((state) => 
        getChatAIProcessing(state, chatType))
    const query = useAppSelector(state => state.chats.query)

    const filteredMessages = chatMessages
        .filter((message) => message.content
            .toLowerCase()
            .includes(query.toLowerCase()))

    return (
        <nav className={styles.messageList} ref={messageListRef}>
            {filteredMessages.map((message, index) => (
                <Message
                    message={message}
                    key={index}
                />
            ))}
            {isAIProcessing &&
                <TextLoader text='Ожидание ответа'/>
            }
        </nav>
    );
};