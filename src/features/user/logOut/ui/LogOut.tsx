import { logOut } from '@/entities/user/model';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/components';
import React from 'react';

interface ILogOut {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogOut: React.FC<ILogOut> = ({setIsOpen}) => {
    const dispatch = useAppDispatch()

    const handleLogOut = (): void => {
        dispatch(logOut())
        setIsOpen(false)
    }

    return (
        <Button
            children='Выйти'
            btnSize='small'
            onClick={handleLogOut}
        />
    );
};