import React from 'react';
import styles from './Container.module.scss'
import { combinedClassNames } from '@/shared/lib/helpers';

interface ContainerProps {
    children: React.ReactNode;
    centeredChildren?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, centeredChildren }) => {
    const containerClass = combinedClassNames(
        styles.container,
        centeredChildren ? styles.centeredChildren : ''
    );

    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};
