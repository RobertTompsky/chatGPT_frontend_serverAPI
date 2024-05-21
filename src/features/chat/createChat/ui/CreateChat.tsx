import { Button, Input } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './CreateChat.module.scss'
import { IChat, createChat } from '@/entities/chat/model';
import { handleInputChange } from '@/shared/lib/functions';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '@/shared/lib/hooks';

export const CreateChat: React.FC = () => {
    const dispatch = useAppDispatch()

    const [chat, setChat] = useState<IChat>({
        id: '',
        name: '',
        messages: [],
        isActive: false,
        isGPTTyping: false
    })
    
    const handleCreateChat = (): void => {
        if (!chat.name.trim()) return;
        
        dispatch(createChat({
            id: uuidv4(),
            name: chat.name,
            messages: [],
            isActive: true,
            isGPTTyping: false
        }))
        setChat({ ...chat, name: '' })
    }

    return (
        <div className={styles.createChat}>
            <Input
                placeholder='Создать чат'
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