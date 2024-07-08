import { Button, TextArea } from '@/shared/ui/components';
import React, { useState } from 'react';
import {
    IChat,
    IChatFeatureProps,
    IMessage,
    addChatMessage,
    getActiveChatByType,
    getModel,
    setChatAIProcessing
} from '@/entities/chat/model';
import styles from './SendMessage.module.scss'
import { 
    useAppDispatch, 
    useAppSelector 
} from '@/shared/lib/hooks';
import { streamResponse } from '@/entities/chat/lib';
import { 
    sendMessageThunk, 
    sendQaMessageThunk 
} from '@/entities/chat/api';

export const SendMessage: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const chat = useAppSelector((state) => 
        getActiveChatByType(state, chatType)) as IChat
    const chatModel = useAppSelector(getModel)

    const [content, setContent] = useState<string>('')

    const sendUserMessage = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newMessage: IMessage = {
            content,
            role: 'human' as 'human'
        };
        const lastHistory = chat.messages.slice(-chat.memoryLength)
        const messagesToSend = [...lastHistory, newMessage]

        setContent('');

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
                    prompt: chat.systemPrompt
                }))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            streamResponse(response, dispatch, 'chat')
                        }
                    })

                break
            case 'qa':
                dispatch(sendQaMessageThunk({
                    sessionId: chat.id,
                    messages: messagesToSend,
                    model: chatModel,
                    prompt: chat.systemPrompt
                }))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            streamResponse(response, dispatch, 'qa')
                        }
                    })
                break
        }
    };

    return (
        <div className={styles.sendMessage}>
            <TextArea
                placeholder='Введите сообщение...'
                onChange={(e) => setContent(e.target.value)}
                value={content}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendUserMessage(e);
                    }
                }}
                style={{ width: '80%' }}
            />
            <Button
                children='Отправить'
                variant='approve'
                btnSize='small'
                onClick={sendUserMessage}
            />
        </div>
    );
};