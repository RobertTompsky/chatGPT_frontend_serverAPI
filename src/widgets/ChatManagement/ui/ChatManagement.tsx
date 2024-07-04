import React from 'react';
import styles from './ChatManagement.module.scss'
import {
    ChangeChat,
    ChangeModel,
    CreateChat,
    DeleteChat,
    SearchMessage
} from '@/features/chat';
import { IChatFeatureProps } from '@/entities/chat/model';
import { combinedClassNames } from '@/shared/lib/helpers';

export const ChatManagement: React.FC<IChatFeatureProps> = ({chatType}) => {

    const sectionClassName = combinedClassNames(
        styles.management,
        styles[chatType]
    )

    const groupClassName = combinedClassNames(
        styles.group,
        styles[chatType]
    )

    return (
        <section className={sectionClassName}>
            <div className={groupClassName}>
                <CreateChat chatType={chatType} />
                <ChangeChat chatType={chatType} />
                <ChangeModel />
            </div>
            <div className={styles.group}>
                <SearchMessage />
                <DeleteChat chatType={chatType} />
            </div>
        </section>
    );
};