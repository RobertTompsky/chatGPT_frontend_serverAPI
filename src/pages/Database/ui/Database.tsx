import React, { useState } from 'react';
import styles from './Database.module.scss'
import { Container } from '@/shared/ui/layout';
import { CreateDoc } from '@/features/doc';

export const Database: React.FC = () => {
    return (
        <Container>
            <div className={styles.page}>
                <CreateDoc />
            </div>
        </Container>
    );
};