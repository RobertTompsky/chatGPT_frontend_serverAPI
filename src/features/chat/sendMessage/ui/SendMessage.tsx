import { Button, TextArea } from '@/shared/ui/components';
import React, { useState } from 'react';
import {
    IChatFeatureProps,
    IMessage,
    addChatMessage,
    getChatMessages,
    getMemoryLength,
    getModel,
    getSystemPrompt,
    setChatAIProcessing
} from '@/entities/chat/model';
import styles from './SendMessage.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { streamResponse } from '@/entities/chat/lib';
import { sendMessageThunk } from '@/entities/chat/api';

export const SendMessage: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const chatMessages = useAppSelector((state) =>
        getChatMessages(state, chatType)) as IMessage[]
    const chatModel = useAppSelector(getModel)
    const chatPrompt = useAppSelector((state) =>
        getSystemPrompt(state, chatType))
    const chatMemoryLength = useAppSelector((state) =>
        getMemoryLength(state, chatType)) as number

    const [userMessage, setUserMessage] = useState<string>('')

    const sendUserMessage = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const newMessage: IMessage = {
            content: userMessage,
            role: 'human' as 'human'
        };
        const lastHistory = chatMessages.slice(-chatMemoryLength)
        const messagesToSend = [...lastHistory, newMessage]

        setUserMessage('');

        dispatch(addChatMessage({
            chatType,
            message: newMessage
        }))
        dispatch(setChatAIProcessing({
            type: chatType,
            isProcessing: true
        }))

        switch (chatType) {
            case 'chat':
                dispatch(sendMessageThunk({
                    messages: messagesToSend,
                    model: chatModel,
                    systemPrompt: chatPrompt as string
                }))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            streamResponse(
                                response,
                                dispatch,
                                'chat'
                            )
                        }
                    })

                break
            case 'qa':
                break
        }
    };

    return (
        <div className={styles.sendMessage}>
            <TextArea
                placeholder='Введите сообщение...'
                onChange={(e) => setUserMessage(e.target.value)}
                value={userMessage}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Предотвращаем перенос строки
                        sendUserMessage(e);
                    }
                }}
                style={{ width: '80%' }}
            />
            <Button
                children='Отправить'
                variant='approve'
                onClick={sendUserMessage}
                btnSize='small'
            />
        </div>
    );
};