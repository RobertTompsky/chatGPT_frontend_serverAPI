import { RootState } from "@/shared/lib/types";
import {
    PayloadAction,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import {
    IChat,
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
        messages: [],
        systemPrompt: 'You are a friendly assistant',
        isActive: true,
        isGPTTyping: false
    }],
    model: 'gpt-3.5-turbo-0125',
    query: ''
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        createChat: (state, action: PayloadAction<IChat>) => {
            const currentChat = state.list
                .find((chat) => chat.isActive === true)
            if (currentChat) {
                currentChat.isActive = false
            }

            state.list.push(action.payload)
        },
        removeChat: (state) => {
            const newList = state.list
                .filter(chat => chat.isActive !== true);
            state.list = newList
        },
        setChatActive: (state, action: PayloadAction<string>) => {
            const currentChat = state.list
                .find((chat) => chat.isActive === true)
            if (currentChat) {
                currentChat.isActive = false
            }

            const targetChat = state.list
                .find((chat) => chat.id === action.payload)
            if (targetChat) {
                targetChat.isActive = true;
            }
        },
        setGPTTyping: (state, action: PayloadAction<boolean>) => {
            const currentChat = state.list
                .find((chat) => chat.isActive === true)
            if (currentChat) {
                currentChat.isGPTTyping = action.payload
            }
        },
        addMessage: (state, action: PayloadAction<IMessage>) => {
            const currentChat = state.list
                .find((chat) => chat.isActive === true)
            if (currentChat) {
                const updatedMessages = [...currentChat.messages, action.payload]
                currentChat.messages = updatedMessages
            }
        },
        streamGPTMessage: (state, action: PayloadAction<string>) => {
            const currentChat = state.list
                .find((chat) => chat.isActive === true)
            if (currentChat) {
                currentChat.messages[currentChat.messages.length - 1].content += action.payload
            }
        },
        changeModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload
        },
        searchMessage: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        }
    }
})

export interface IRequest {
    messages: IMessage[],
    model: string,
    systemPrompt: string
}

export const sendMessageThunk = createAsyncThunk(
    'chat/sendMessage',
    async (req: IRequest, { dispatch }) => {

        const {messages, model, systemPrompt} = req

        const response = await fetch("http://127.0.0.1:3000/chat/send_message", {
            method: 'POST',
            body: JSON.stringify({ 
                messages,
                model,
                systemPrompt
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const rs = response.body as ReadableStream<Uint8Array>;
        const reader = rs.getReader();
        const decoder = new TextDecoder("utf-8");

        dispatch(setGPTTyping(false))
        dispatch(addMessage({
            role: 'ai' as 'ai',
            content: ''
        }));

        while (true) {
            const { value, done } = await reader.read();
            const chunk = decoder.decode(value, { stream: true });
            console.log("decoded chunk : ", chunk);
            dispatch(streamGPTMessage(chunk));
            if (done) break;
        }
    }
);


export const chatReducer
    = chatSlice.reducer

export const {
    createChat,
    setChatActive,
    removeChat,
    addMessage,
    streamGPTMessage,
    changeModel,
    setGPTTyping,
    searchMessage
} = chatSlice.actions

export const getChats
    = (state: RootState) => state.chats.list

export const getChatMessages
    = (state: RootState) => state.chats.list
        .find((chat) => chat.isActive === true)
        ?.messages

export const getModel
    = (state: RootState) => state.chats.model

export const getGPTTyping
    = (state: RootState) => state.chats.list
        .find((chat) => chat.isActive === true)
        ?.isGPTTyping

export const getSystemPrompt
    = (state: RootState) => state.chats.list
        .find((chat) => chat.isActive === true)
        ?.systemPrompt