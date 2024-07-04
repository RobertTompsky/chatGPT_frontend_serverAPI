import { TextArea, Button } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './EditPrompt.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { editPrompt, getSystemPrompt, IChatFeatureProps } from '@/entities/chat/model';

export const EditPrompt: React.FC<IChatFeatureProps> = ({chatType}) => {
    const prompt = useAppSelector((state) => getSystemPrompt(state, chatType)) as string
    const [textValue, setTextValue] = useState<string>(prompt as string)
    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch(editPrompt({
            chatType,
            prompt: textValue
        }))
    }
    
    return (
        <div className={styles.editPrompt}>
            <TextArea
                placeholder='Редактировать промпт...'
                onChange={(e) => { setTextValue(e.target.value)}}
                value={textValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        handleSubmit(e)
                    }
                }}
                style={{ width: '80%' }}
            />
            <Button
                children='Сохранить промпт'
                variant='approve'
                onClick={handleSubmit}
                btnSize='small'
                disabled={textValue === prompt}
            />
        </div>
    );
};