import React from 'react';
import styles from './Database.module.scss'
import { Container } from '@/shared/ui/layout';
import { CreateDoc } from '@/features/doc';
import { CurrentChat } from '@/widgets/CurrentChat';
import { ChatManagement } from '@/widgets/ChatManagement';

export const Database: React.FC = () => {
    return (
        <Container>
            <div className={styles.page}>
                <div className={styles.qaChat}>
                    <ChatManagement chatType='qa'/>
                    <CurrentChat chatType='qa'/>
                </div>
                <CreateDoc />
            </div>
        </Container>
    );
};