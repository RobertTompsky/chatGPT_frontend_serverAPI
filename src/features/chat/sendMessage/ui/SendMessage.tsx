import { Button, TextArea } from '@/shared/ui/components';
import React, { useState } from 'react';
import {
    IMessage,
    addMessage,
    getChatMessages
} from '@/entities/chat/model';
import styles from './SendMessage.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { useGetAnswerMutation } from '@/entities/chat/api/chatApi/chatApi';
import { sendMessageThunk, streamGPTMessage } from '@/entities/chat/model/slices/chatsSlice';

export const SendMessage: React.FC = () => {
    const [getAnswer] = useGetAnswerMutation()
    const dispatch = useAppDispatch()
    const chatMessages = useAppSelector(getChatMessages) as IMessage[]
    const [userMessage, setUserMessage] = useState<string>('')

    const sendUserMessage =
        async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent> |
                React.KeyboardEvent<HTMLTextAreaElement>
        ) => {
            e.preventDefault();
            if (!userMessage.trim()) return;

            const newMessage: IMessage = {
                content: userMessage,
                role: 'human' as 'human'
            };

            dispatch(addMessage(newMessage))

            setUserMessage('');

            const messagesToSend = [...chatMessages, newMessage]
            dispatch(sendMessageThunk(messagesToSend))
        };

    return (
        <div className={styles.inputBlock}>
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
