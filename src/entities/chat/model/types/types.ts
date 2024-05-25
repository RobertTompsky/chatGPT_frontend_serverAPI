export type IMessage = {
    content: string,
    role: 'human' | 'ai' | 'system'
}

export type IChat = {
    id: string
    name: string
    messages: IMessage[]
    systemPrompt: string
    isActive: boolean
    isGPTTyping: boolean
}

export type IChatBody = Omit<IChat, 'id'>

export type IChatModel = {
    title: string,
    model: string
}