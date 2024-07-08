import React from 'react';
import styles from './ChatManagement.module.scss'
import {
    ChangeChat,
    ChangeModel,
    CreateChat,
    DeleteChat,
    SearchMessage
} from '@/features/chat';
import { getChatsByType, IChatFeatureProps } from '@/entities/chat/model';
import { combinedClassNames } from '@/shared/lib/helpers';
import { useAppSelector } from '@/shared/lib/hooks';

export const ChatManagement: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) =>
        getChatsByType(state, chatType))
    const hasChats = chats.length > 0

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
                {hasChats && <ChangeModel />}
            </div>
            {hasChats &&
                <div className={styles.group}>
                    <SearchMessage />
                    <DeleteChat chatType={chatType} />
                </div>
            }
        </section>
    );
};