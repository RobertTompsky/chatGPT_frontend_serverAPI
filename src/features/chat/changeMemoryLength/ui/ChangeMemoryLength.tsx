import {
    IChat,
    IChatFeatureProps,
    MEMORY_LENGTH,
    changeMemoryLength,
    getMemoryLength
} from '@/entities/chat/model';
import {
    useAppDispatch,
    useAppSelector
} from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeMemoryLength: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()
    const chatMemoryLength = useAppSelector((state) =>
        getMemoryLength(state, chatType)) as number

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const length = Number(e.target.value)
        dispatch(changeMemoryLength({
            chatType,
            length
        }))
    }

    return (
        <Select
            defaultOptionTitle='Выбрать память'
            options={MEMORY_LENGTH.map(({title, value}) => ({
                value,
                title
            }))}
            value={chatMemoryLength}
            onChange={handleChange}
        />
    );
};
