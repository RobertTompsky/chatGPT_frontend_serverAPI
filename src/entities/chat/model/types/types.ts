export type IMessage = {
    content: string,
    role: 'human' | 'ai' | 'system'
}

export type IChatType = 'chat' | 'qa'

export type IChatDisplayedField = 'request' | 'prompt'

export type IChat = {
    id: string
    name: string
    type: IChatType
    messages: IMessage[]
    systemPrompt: string
    memoryLength: number
    isActive: boolean
    isAIProcessing: boolean,
    displayedField: IChatDisplayedField
}

export interface IChatFeatureProps {
    chatType: IChatType
}

export type IChatBody = Omit<IChat, 'id'>

export interface IChatRequest {
    messages: IMessage[],
    model: string,
    systemPrompt: string
}

export interface IQaRequest {
    messages: IMessage[]
}