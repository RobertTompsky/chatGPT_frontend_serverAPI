import React from 'react';
import styles from './ChatManagement.module.scss'
import {
    ChangeChat,
    ChangeModel,
    CreateChat,
    DeleteChat,
    SearchMessage
} from '@/features/chat';

export const ChatManagement: React.FC = () => {
    return (
        <section className={styles.block}>
            <CreateChat chatType='chat'/>
            <div className={styles.group}>
                <SearchMessage />
                <ChangeChat chatType='chat'/>
                <ChangeModel />
                <DeleteChat chatType='chat'/>
            </div>
        </section>
    );
};