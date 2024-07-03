import { 
    IChatFeatureProps, 
    getChatsByType, 
    setChatActive 
} from '@/entities/chat/model';
import { 
    useAppSelector, 
    useAppDispatch 
} from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) => getChatsByType(state, chatType))
    const activeChat = chats.find((chat) => chat.isActive);

    const dispatch = useAppDispatch()
    
    return (
        <Select
            defaultOptionTitle='Выбрать чат'
            options={chats.map(({id, name}) => ({
                value: id,
                title: name
            }))}
            value={activeChat?.id}
            onChange={(e) => dispatch(setChatActive({
                id: e.target.value,
                type: chatType
            }))}
        />
    );
};
