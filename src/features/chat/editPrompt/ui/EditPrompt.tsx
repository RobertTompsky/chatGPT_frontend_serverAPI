import { TextArea, Button } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './EditPrompt.module.scss'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { editPrompt, getSystemPrompt } from '@/entities/chat/model';

export const EditPrompt: React.FC = () => {
    const prompt = useAppSelector(getSystemPrompt)
    const [textValue, setTextValue] = useState<string>(prompt as string)
    const dispatch = useAppDispatch()
    
    return (
        <div className={styles.editPrompt}>
            <TextArea
                placeholder='Редактировать промпт...'
                onChange={(e) => { setTextValue(e.target.value)}}
                value={textValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Предотвращаем перенос строки
                        dispatch(editPrompt({
                            chatType: 'chat',
                            prompt: textValue
                        }))
                    }
                }}
                style={{ width: '80%' }}
            />
            <Button
                children='Сохранить промпт'
                variant='approve'
                onClick={() => dispatch(editPrompt({
                    chatType: 'chat',
                    prompt: textValue
                }))}
                btnSize='small'
                disabled={textValue === prompt}
            />
        </div>
    );
};