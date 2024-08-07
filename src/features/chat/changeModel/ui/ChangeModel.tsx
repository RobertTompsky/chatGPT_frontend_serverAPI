import { MODELS, changeModel } from '@/entities/chat/model';
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeModel: React.FC = () => {
    const model = useAppSelector(state => state.chats.model)
    const dispatch = useAppDispatch()

    return (
        <Select
            defaultOptionTitle='Выбрать модель'
            options={MODELS.map(({title, value}) => ({
                value,
                title
            }))}
            value={model}
            onChange={(e) =>
                dispatch(changeModel(e.target.value))
            }
        />
    );
};
