import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss'
import { combinedClassNames } from '@/shared/lib/helpers';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'delete' | 'approve';
    btnSize?: 'small' | 'medium' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    btnSize = 'medium',
    children,
    ...rest
}) => {
    const buttonClass = combinedClassNames(
        styles.button,
        styles[variant],
        styles[btnSize]
    );

    return (
        <button
            className={buttonClass}
            {...rest}>
            {children}
        </button>
    );
};