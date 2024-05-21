import { IChat, setChatActive } from '@/entities/chat/model';
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeChat: React.FC = () => {
    const chats: IChat[] = useAppSelector((state) => state.chats.list)
    const activeChat = chats.find((chat) => chat.isActive);

    const dispatch = useAppDispatch()
    
    return (
        <Select
            defaultOptionTitle='Выбрать чат'
            options={chats.map((chat) => ({
                value: chat.id,
                title: chat.name
            }))}
            value={activeChat?.id}
            onChange={(e) => dispatch(setChatActive(e.target.value))}
        />
    );
};
