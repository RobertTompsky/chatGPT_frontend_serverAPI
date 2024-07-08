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
        const activeChatIndex = chats.findIndex(chat => chat === activeChat)
        const previousChat = chats[activeChatIndex - 1]
        const nextChat = chats[activeChatIndex + 1]
        const chatToSetActive = previousChat || nextChat

        dispatch(removeChat(chatType))

        if (chatToSetActive) {
            dispatch(setChatActive({
                id: chatToSetActive.id,
                type: chatType
            }))
        }
    }

    return (
        <Button
            variant='delete'
            children='Удалить чат'
            btnSize='small'
            onClick={handleDeleteChat}
        />
    );
};