import React, { useState } from 'react';
import styles from './Database.module.scss'
import { Container } from '@/shared/ui/layout';
import { CreateDoc } from '@/features/doc';
import { Button, TextArea } from '@/shared/ui/components';
import { MessageList } from '@/entities/chat/ui';
import { ChangeChat, ChangeMemoryLength, ChangeModel, CreateChat, SearchMessage } from '@/features/chat';
import { IChatFeatureProps } from '@/entities/chat/model';
import { CurrentChat } from '@/widgets/CurrentChat';

export const Database: React.FC = () => {
    return (
        <Container>
            <div className={styles.page}>
                <div className={styles.qaChat}>
                    <div className={styles.head}>
                        <CreateChat chatType='qa'/>
                        <ChangeChat chatType='qa'/>
                        <ChangeModel />
                        <SearchMessage />
                    </div>
                    <CurrentChat chatType='qa'/>
                </div>
                <CreateDoc />
            </div>
        </Container>
    );
};