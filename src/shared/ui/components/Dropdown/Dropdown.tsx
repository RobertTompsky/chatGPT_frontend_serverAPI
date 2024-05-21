import React, { useRef } from 'react';
import styles from './Dropdown.module.scss'
import { useClickOutside } from '@/shared/lib/hooks';

interface IDropdown {
    children: React.ReactNode
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dropdown: React.FC<IDropdown> = ({
    children,
    isOpen,
    setIsOpen
}) => {

    const dropdownRef
        = useRef<HTMLDivElement>(null);

    useClickOutside(
        dropdownRef,
        () => setIsOpen(false)
    )

    return (
        <>
            {isOpen &&
                <div
                    className={styles.dropdown}
                    ref={dropdownRef}
                >
                    {children}
                </div>
            }
        </>
    );
};