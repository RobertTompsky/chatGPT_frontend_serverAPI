import { 
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

export const ChangeMemoryLength: React.FC = () => {
    const dispatch = useAppDispatch()
    const memoryLength = useAppSelector(getMemoryLength)

    return (
        <Select
            defaultOptionTitle='Выбрать память'
            options={MEMORY_LENGTH.map((model) => ({
                value: model.value,
                title: model.title
            }))}
            value={memoryLength}
            onChange={(e) => { 
                dispatch(changeMemoryLength(Number(e.target.value)))
            }}
        />
    );
};
