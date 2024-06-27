export type IMessage = {
    content: string,
    role: 'human' | 'ai' | 'system'
}

export type IChat = {
    id: string
    name: string
    messages: IMessage[]
    memoryLength: number
    systemPrompt: string
    isActive: boolean
    isGPTTyping: boolean,
    displayedField: string
}

export type IChatBody = Omit<IChat, 'id'>

export type IChatModel = {
    title: string,
    model: string
}