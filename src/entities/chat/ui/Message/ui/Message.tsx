import React from 'react';
import { combinedClassNames } from '@/shared/lib/helpers';
import styles from './Message.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { IMessage } from '@/entities/chat/model';

interface MessageProps {
    message: IMessage
}

export const Message: React.FC<MessageProps> = ({ message }) => {

    const messageClass = combinedClassNames(
        styles.message,
        message.role === 'human'
            ? styles.sended
            : styles.received
    )

    const formattedMessage = message.content.split('```');

    return (
        <div className={messageClass}>
            {formattedMessage.map((part, index) => {
                if (index % 2 === 0) {
                    return (
                        <ReactMarkdown
                            key={index}
                            className={styles.markDown}>
                            {part}
                        </ReactMarkdown>
                    );
                } else {
                    return (
                        <div key={index} className="code-block">
                            <SyntaxHighlighter
                                language="javascript"
                                style={okaidia}
                            >
                                {part.trim()}
                            </SyntaxHighlighter>
                        </div>
                    );
                }
            })}
        </div>
    );
};
