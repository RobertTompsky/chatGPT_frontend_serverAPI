import React from 'react';
import styles from './ChangeDisplayedField.module.scss'
import { Select } from '@/shared/ui/components';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { FIELDS, changeDisplayedField, getDisplayedField } from '@/entities/chat/model';

export const ChangeDisplayedField: React.FC = () => {
    const field = useAppSelector(getDisplayedField)
    const dispatch = useAppDispatch()
    
    return (
        <Select
            defaultOptionTitle='Выбрать поле'
            options={FIELDS.map((field) => ({
                value: field.value,
                title: field.title
            }))}
            value={field}
            onChange={(e) => { 
                dispatch(changeDisplayedField(e.target.value))
            }}
        />
    );
};