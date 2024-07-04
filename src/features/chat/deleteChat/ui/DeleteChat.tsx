import { 
    IChatFeatureProps, 
    getActiveChatByType, 
    getChatsByType, 
    removeChat, 
    setChatActive
} from '@/entities/chat/model';
import { 
    useAppDispatch, 
    useAppSelector 
} from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/components';
import React from 'react';

export const DeleteChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) => 
        getChatsByType(state, chatType))
    const activeChat = useAppSelector((state) => 
        getActiveChatByType(state, chatType))
    const dispatch = useAppDispatch()

    const handleDeleteChat = (): void => {
        const lastChat = chats[chats.length - 1]
        dispatch(removeChat(chatType))
        if (lastChat) {
            dispatch(setChatActive({
                id: lastChat.id,
                type: chatType
            }))
        }
    }

    return (
        <>
            {chats.length > 0 &&
                <Button
                    variant='delete'
                    children='Удалить чат'
                    btnSize='small'
                    onClick={handleDeleteChat}
                    disabled={!activeChat}
                />
            }
        </>
    );
};