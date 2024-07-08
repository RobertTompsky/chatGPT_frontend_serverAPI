import { RootState } from "@/shared/lib/types";
import {
    PayloadAction,
    createSlice
} from "@reduxjs/toolkit";
import {
    IChat,
    IChatDisplayedField,
    IChatType,
    IMessage
} from "..";

interface IChatsState {
    list: IChat[],
    model: string,
    query: string
}

const initialState: IChatsState = {
    list: [{
        id: 'gdsgdsdgs-34324-sdfs',
        name: 'Дефолтный чат',
        type: 'chat',
        messages: [],
        memoryLength: 2,
        systemPrompt: 'You are a friendly assistant',
        isActive: true,
        isAIProcessing: false,
        displayedField: 'request'
    }],
    model: 'gpt-3.5-turbo-0125',
    query: ''
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        createChat: (state, action: PayloadAction<IChat>) => {
            const type = action.payload.type;
            const isAnyActiveChat = action.payload.type === 'chat'
                ? state.list.some(chat => chat.isActive && chat.type === 'chat')
                : state.list.some(chat => chat.isActive && chat.type === 'qa');

            if (isAnyActiveChat) {
                state.list.forEach(chat => {
                    if (chat.isActive && chat.type === type) {
                        chat.isActive = false;
                    }
                });
            }

            state.list.push(action.payload);
        },
        removeChat: (state, action: PayloadAction<IChatType>) => {
            const chatType = action.payload;
            const chatToRemove = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (chatToRemove) {
                state.list = state.list.filter((chat) => chat !== chatToRemove);
            }
        },
        setChatActive: (state, action: PayloadAction<{
            id: string,
            type: IChatType
        }>) => {
            const { id, type } = action.payload
            const isAnyActiveChat = type === 'chat'
                ? state.list.some(chat => chat.isActive && chat.type === 'chat')
                : state.list.some(chat => chat.isActive && chat.type === 'qa');

            if (isAnyActiveChat) {
                state.list.forEach(chat => {
                    if (chat.isActive && chat.type === type) {
                        chat.isActive = false;
                    }
                });
            }

            const targetChat = state.list
                .find((chat) => chat.id === id && chat.type === type)

            if (targetChat) {
                targetChat.isActive = true;
            }
        },
        setChatAIProcessing: (state, action: PayloadAction<{
            type: IChatType,
            isProcessing: boolean
        }>) => {
            const { type, isProcessing } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === type)

            if (currentChat) {
                currentChat.isAIProcessing = isProcessing
            }
        },
        addChatMessage: (state, action: PayloadAction<{
            chatType: IChatType,
            message: IMessage
        }>) => {
            const { chatType, message } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                const updatedMessages = [...currentChat.messages, message]
                currentChat.messages = updatedMessages
            }
        },
        streamChatAIMessage: (state, action: PayloadAction<{
            chatType: IChatType,
            content: string
        }>) => {
            const { chatType, content } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                const lastMessageIndex = currentChat.messages.length - 1
                currentChat.messages[lastMessageIndex].content += content
            }
        },
        changeMemoryLength: (state, action: PayloadAction<{
            chatType: IChatType,
            length: number
        }>) => {
            const { chatType, length } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.memoryLength = length
            }
        },
        editPrompt: (state, action: PayloadAction<{
            chatType: IChatType,
            prompt: string
        }>) => {
            const { chatType, prompt } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.systemPrompt = prompt
            }
        },
        changeModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload
        },
        changeDisplayedField: (state, action: PayloadAction<{
            chatType: IChatType,
            displayedField: IChatDisplayedField
        }>) => {
            const { chatType, displayedField } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.displayedField = displayedField
            }
        },
        searchMessage: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        setInitialState: () => initialState
    }
})

export const chatReducer = chatSlice.reducer

export const {
    createChat,
    setChatActive,
    removeChat,
    addChatMessage,
    streamChatAIMessage,
    editPrompt,
    changeModel,
    changeMemoryLength,
    setChatAIProcessing,
    searchMessage,
    changeDisplayedField,
    setInitialState
} = chatSlice.actions

export const getChatsByType
    = (state: RootState, chatType: IChatType) => state.chats.list
        .filter((chat) => chat.type === chatType)

export const getActiveChatByType
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)

export const getChatMessages
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)
        ?.messages

export const getModel
    = (state: RootState) => state.chats.model

export const getChatAIProcessing
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)
        ?.isAIProcessing

export const getSystemPrompt
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)
        ?.systemPrompt

export const getDisplayedField
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)
        ?.displayedField

export const getMemoryLength
    = (state: RootState, chatType: IChatType) => state.chats.list
        .find((chat) => chat.isActive === true && chat.type === chatType)
        ?.memoryLength