import { 
    IChatFeatureProps, 
    getChatsByType, 
    removeChat 
} from '@/entities/chat/model';
import { 
    useAppDispatch, 
    useAppSelector 
} from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/components';
import React from 'react';

export const DeleteChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) => getChatsByType(state, chatType))
    const dispatch = useAppDispatch()

    const handleDeleteChat = (): void => {
        dispatch(removeChat('chat'))
    }

    return (
        <>
            {chats.length > 0 &&
                <Button
                    variant='delete'
                    children='Удалить'
                    btnSize='small'
                    onClick={handleDeleteChat}
                />
            }
        </>
    );
};