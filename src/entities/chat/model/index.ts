export { MODELS } from './data'

export {
    chatReducer,
    createChat,
    setChatActive,
    setGPTTyping,
    removeChat,
    addMessage,
    changeModel,
    searchMessage,
    getChats,
    getChatMessages,
    getGPTTyping,
    getModel,
    getSystemPrompt
} from './slices/chatsSlice'

export type {
    IMessage,
    IChat,
    IChatBody,
    IChatModel
} from './types/types'

