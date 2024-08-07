export { 
    MODELS, 
    FIELDS, 
    MEMORY_LENGTH 
} from './data/data'

export {
    chatReducer,
    createChat,
    setChatActive,
    setChatAIProcessing,
    removeChat,
    addChatMessage,
    editPrompt,
    changeModel,
    changeMemoryLength,
    searchMessage,
    changeDisplayedField,
    setInitialState,
    streamChatAIMessage,
    getChatsByType,
    getActiveChatByType,
    getChatMessages,
    getChatAIProcessing,
    getModel,
    getSystemPrompt,
    getDisplayedField,
    getMemoryLength
} from './slices/chatsSlice'

export type {
    IMessage,
    IChatType,
    IChatDisplayedField,
    IChat,
    IChatBody,
    IChatRequest,
    IQaRequest,
    IChatFeatureProps
} from './types/types'

