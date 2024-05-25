import React from 'react';
import styles from './ChatManagement.module.scss'
import {
    ChangeChat,
    ChangeModel,
    CreateChat,
    DeleteChat,
    SearchMessage
} from '@/features/chat';
import { Button } from '@/shared/ui/components';

export const ChatManagement: React.FC = () => {
    return (
        <section className={styles.block}>
            <CreateChat />
            <div className={styles.group}>
                <SearchMessage />
                <ChangeChat />
                <ChangeModel />
                <Button children='Промпт' btnSize='small'/>
                <DeleteChat />
            </div>
        </section>
    );
};