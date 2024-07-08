import {
    useAddFileDocMutation,
    useAddWebDocMutation
} from '@/entities/doc/api';
import {
    handleInputChange,
    handleSetFile
} from '@/shared/lib/functions';
import {
    Input,
    UploadLabel,
    Button,
    Form,
    Select
} from '@/shared/ui/components';
import { TextLoader } from '@/shared/ui/loaders';
import React, { useState } from 'react';
import styles from './createDoc.module.scss'
import { DOC_TYPES, IDoc } from '@/entities/doc/model';
import { Feedback } from '@/shared/ui/notifications';

export const CreateDoc: React.FC = () => {
    const [doc, setDoc] = useState<IDoc>({
        type: '',
        name: '',
        url: ''
    })
    const [file, setFile] = useState<File | Blob | undefined>(undefined)
    const [feedBack, setFeedBack] = useState<string>('')

    const [uploadDocFile, {
        isLoading: isFileLoading,
        isSuccess: isFileSuccess,
        isError: isFileError
    }] = useAddFileDocMutation()

    const [addWebDocToDB, {
        isLoading: isWebLoading,
        isSuccess: isWebSuccess,
        isError: isWebError
    }] = useAddWebDocMutation()

    const isLoading = isFileLoading || isWebLoading
    const isSuccess = isFileSuccess || isWebSuccess
    const isError = isFileError || isWebError

    const uploadDoc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        try {
            if (file) {
                formData.append('doc', file)
                formData.append('docName', doc.name as string)

                const response = await uploadDocFile(formData)
                    .unwrap()
                    .then((res) => res.message)

                setFeedBack(response as string)

            } else {
                const response = await addWebDocToDB({
                    url: doc.url as string
                })
                    .unwrap()
                    .then((res) => res.message)

                setFeedBack(response as string)
            }
        } catch (error) {
            console.log(error)
            setFeedBack('Ошибка загрузки документа')
        }
    }
    return (
        <Form
            title='Дополнить базу'
            width='35%'
            encType='multipart/form-data'
            onSubmit={uploadDoc}
        >
            <Select
                defaultOptionTitle='Выбрать тип документа'
                options={DOC_TYPES.map((type) => ({
                    value: type.value,
                    title: type.title
                }))}
                value={doc.type}
                onChange={(e) => { handleInputChange(e, setDoc) }}
                name='type'
            />

            {
                doc.type === 'file'
                    ?
                    <div className={styles.fileForm}>
                        <Input
                            placeholder='Название документа...'
                            onChange={(e) => { handleInputChange(e, setDoc) }}
                            value={doc.name}
                            name='name'
                        />
                        <UploadLabel
                            title='Выбрать файл'
                            file={file}
                            htmlFor='file'
                        />
                        <Input
                            id='file'
                            type='file'
                            onChange={(e) => { handleSetFile(setFile)(e) }}
                        />
                    </div>
                    :
                    <Input
                        placeholder='Ссылка на веб-страницу...'
                        onChange={(e) => { handleInputChange(e, setDoc) }}
                        value={doc.url}
                        name='url'
                    />
            }

            <Button
                children='Добавить'
                variant='approve'
                btnSize='small'
            />

            {
                isLoading
                &&
                <TextLoader text='Обработка на сервере' />
            }
            {
                isSuccess
                &&
                <Feedback
                    message={feedBack}
                    type='success'
                />
            }
            {
                isError
                &&
                <Feedback
                    message={feedBack}
                    type='error'
                />
            }
        </Form>
    );
};