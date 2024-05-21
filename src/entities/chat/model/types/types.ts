export type IMessage = {
    content: string,
    role: 'human' | 'ai' | 'system'
}

export type IChat = {
    id: string
    name: string
    messages: IMessage[]
    isActive: boolean
    isGPTTyping: boolean
}

export type IChatBody = Omit<IChat, 'id'>

export type GPTModel = 'gpt-4-turbo' | 'gpt-3.5-turbo-0125'

export type ModelObj = {
    title: string,
    model: GPTModel
}