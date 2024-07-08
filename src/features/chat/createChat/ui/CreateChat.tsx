import { Button, Input } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './CreateChat.module.scss'
import { 
    IChat, 
    IChatFeatureProps, 
    createChat 
} from '@/entities/chat/model';
import { handleInputChange } from '@/shared/lib/functions';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@/shared/lib/hooks';

export const CreateChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const [chat, setChat] = useState<IChat>({
        id: '',
        name: '',
        type: chatType,
        messages: [],
        memoryLength: 0,
        systemPrompt: '',
        isActive: false,
        isAIProcessing: false,
        displayedField: 'request'
    })

    const handleCreateChat = (): void => {
        if (!chat.name.trim()) return;

        dispatch(createChat({
            id: uuidv4(),
            name: chat.name,
            type: chatType,
            messages: [],
            memoryLength: 2,
            systemPrompt: 'Ты дружелюбный мусульманин. На приветствие ты отвечаешь "Ассалам уалейкум, брат". В конце своего ответа ты всегда говоришь, что Аллах велик',
            isActive: true,
            isAIProcessing: false,
            displayedField: 'request'
        }))
        setChat({ ...chat, name: '' })
    }

    return (
        <div className={styles.createChat}>
            <Input
                placeholder={
                    chatType === 'chat'
                        ? 'Создать чат...'
                        : 'Создать qa-чат...'
                }
                value={chat.name}
                name='name'
                onChange={(e) => handleInputChange(e, setChat)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Предотвращаем перенос строки
                        handleCreateChat()
                    }
                }}
            />
            <Button
                children='Ок'
                variant='approve'
                btnSize='small'
                onClick={handleCreateChat}
            />
        </div>
    );
};