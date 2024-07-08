import React from 'react';
import styles from './Feedback.module.scss'
import { combinedClassNames } from '@/shared/lib/helpers';

interface IFeedback {
    type: 'success' | 'error'
    message: string
}

export const Feedback: React.FC<IFeedback> = ({ type, message }) => {
    
    const feedbackClass = combinedClassNames(
        styles.feedback,
        styles[type]
    )

    return (
        <span className={feedbackClass}>
            {message}
        </span>
    );
};