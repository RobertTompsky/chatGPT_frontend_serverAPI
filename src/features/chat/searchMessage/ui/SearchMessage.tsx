import { searchMessage } from '@/entities/chat/model';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/components';
import React from 'react';

export const SearchMessage: React.FC = () => {
    const dispatch = useAppDispatch()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchMessage(e.target.value))
    }

    return (
        <Input
            placeholder='Поиск сообщения...'
            onChange={handleSearch}
        />
    );
};