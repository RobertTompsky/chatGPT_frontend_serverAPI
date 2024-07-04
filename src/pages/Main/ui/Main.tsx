import React from 'react';
import styles from './Main.module.scss'
import { Container } from '@/shared/ui/layout';
import { ChatManagement } from '@/widgets/ChatManagement';
import { CurrentChat } from '@/widgets/CurrentChat';

export const Main: React.FC = () => {
    return (
        <Container>
            <div className={styles.mainPage}>
                <ChatManagement chatType='chat'/>
                <CurrentChat chatType='chat'/>
            </div>
        </Container>
    );
};
