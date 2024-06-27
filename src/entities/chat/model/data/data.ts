import { IChatModel } from "../types/types";

export const MODELS: IChatModel[] = [
    {
        title: 'GPT-4',
        model: 'gpt-4o'
    },
    {
        title: 'GPT-3.5',
        model: 'gpt-3.5-turbo-0125'
    }
]

export const FIELDS: {title: string, value: string}[] = [
    {
        title: 'Запрос',
        value: 'request'
    },
    {
        title: 'Промпт',
        value: 'prompt'
    }
]

export const MEMORY_LENGTH: {title: string, value: number}[] = [
    {
        title: '2 сообщения',
        value: 2,
    },
    {
        value: 6,
        title: '6 сообщений'
    },
    {
        value: 10,
        title: '10 сообщений'
    },
]
