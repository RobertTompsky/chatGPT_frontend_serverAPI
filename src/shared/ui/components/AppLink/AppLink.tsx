import React from 'react';
import styles from './AppLink.module.scss'
import { Link, LinkProps } from 'react-router-dom';
import { combinedClassNames } from '@/shared/lib/helpers';

interface IAppLink extends LinkProps {
    fontSize: 'small' | 'medium' | 'large'
}

export const AppLink: React.FC<IAppLink> = ({
    fontSize = 'medium',
    to,
    children,
    ...rest
}) => {
    const linkClass = combinedClassNames(
        styles.link,
        styles[fontSize]
    )

    return (
        <Link
            to={to}
            className={linkClass}
            children={children}
            {...rest}
        />
    );
};