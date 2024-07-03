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
    setChatAITyping
} from '@/entities/chat/model';
import styles from './SendMessage.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { sendMessageThunk } from '@/entities/chat/model/slices/chatsSlice';
import { streamResponse } from '@/entities/chat/lib';
import { PayloadAction } from '@reduxjs/toolkit';

export const SendMessage: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const chatMessages = useAppSelector((state) =>
        getChatMessages(state, chatType)) as IMessage[]
    const chatModel = useAppSelector(getModel)
    const chatPrompt = useAppSelector(getSystemPrompt)
    const chatMemoryLength = useAppSelector((state) =>
        getMemoryLength(state, chatType)) as number

    const [userMessage, setUserMessage] = useState<string>('')

    const sendUserMessage = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> |
            React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
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
        dispatch(setChatAITyping({
            type: chatType,
            isProcessing: true
        }))

        switch (chatType) {
            case 'chat':
                const response = await dispatch(sendMessageThunk({
                    messages: messagesToSend,
                    model: chatModel,
                    systemPrompt: chatPrompt as string
                })) as PayloadAction<Response>

                await streamResponse(response.payload, dispatch, 'chat')
                
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