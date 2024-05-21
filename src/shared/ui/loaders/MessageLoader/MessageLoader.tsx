import React from 'react';
import styles from './MessageLoader.module.scss'

export const MessageLoader: React.FC = () => {
    return (
        <span className={styles.typingAnimation}>
            Формирую ответ
        </span>
    );
};
