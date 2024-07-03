import React from 'react';
import styles from './ChangeDisplayedField.module.scss'
import { Select } from '@/shared/ui/components';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    FIELDS, 
    IChatDisplayedField, 
    IChatFeatureProps, 
    changeDisplayedField, 
    getDisplayedField 
} from '@/entities/chat/model';

export const ChangeDisplayedField: React.FC<IChatFeatureProps> = ({chatType}) => {
    const field = useAppSelector((state) => getDisplayedField(state, chatType))
    const dispatch = useAppDispatch()
    
    return (
        <Select
            defaultOptionTitle='Выбрать поле'
            options={FIELDS.map(({title, value}) => ({
                value,
                title
            }))}
            value={field}
            onChange={(e) => { 
                const value = e.target.value
                dispatch(changeDisplayedField({
                    chatType,
                    displayedField: value as IChatDisplayedField
                }))
            }}
        />
    );
};