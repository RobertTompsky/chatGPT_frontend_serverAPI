import React from 'react';
import styles from './UploadLabel.module.scss'

interface UploadLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    title: string
}

export const UploadLabel: React.FC<UploadLabelProps> = ({
    title,
    htmlFor
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={styles.uploadLabel}>
            {title}
        </label>
    );
};