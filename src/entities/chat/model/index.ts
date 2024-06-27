export { MODELS, FIELDS, MEMORY_LENGTH } from './data/data'

export {
    chatReducer,
    createChat,
    setChatActive,
    setGPTTyping,
    removeChat,
    addMessage,
    editPrompt,
    changeModel,
    changeMemoryLength,
    searchMessage,
    changeDisplayedField,
    getChats,
    getChatMessages,
    getGPTTyping,
    getModel,
    getSystemPrompt,
    getDisplayedField,
    getMemoryLength
} from './slices/chatsSlice'

export type {
    IMessage,
    IChat,
    IChatBody,
    IChatModel
} from './types/types'

