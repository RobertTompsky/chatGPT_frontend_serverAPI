import styles from './FormField.module.scss'
import { 
    FieldError, 
    FieldValues, 
    Path, 
    UseFormRegister 
} from 'react-hook-form';

type AdditionalSelectProps = {
    options: { value: string | number; title: string | number }[];
    defaultOptionTitle: string;
};

export type IFormField<
    T extends FieldValues, // Это гарантирует, что T всегда будет соответствовать FieldValues или его подтипу
    F extends 'input' | 'select' | 'textarea'
> = {
    fieldType: F
    dataType?: string;
    placeholder?: string;
    name: Path<T>; // Изменено с ValidFieldNames на keyof T для прямой совместимости с типом T
    register: UseFormRegister<T>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
} & (F extends 'select' ? AdditionalSelectProps : {});


export const FormField
    = <T extends FieldValues>({
        fieldType,
        placeholder,
        name,
        dataType,
        register,
        error,
        valueAsNumber,
        ...rest
    }: IFormField<T, "input" | "select" | "textarea">) => {

        return (
            <div className={styles.formField}>

                {fieldType === 'input' && (
                    <input
                        type={dataType}
                        placeholder={placeholder}
                        {...register(name, { valueAsNumber })}
                    />
                )}

                {fieldType === 'textarea' && (
                    <textarea 
                    placeholder={placeholder}
                    {...register(name, { valueAsNumber })}
                    />
                )}

                {fieldType === 'select' && (
                    <select {...register(name, { valueAsNumber })}>
                        <option disabled value={''}>
                            {(rest as AdditionalSelectProps).defaultOptionTitle}
                        </option>
                        {(rest as AdditionalSelectProps).options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.title}
                            </option>
                        ))}
                    </select>
                )}
                {error && <span>{error.message}</span>}
            </div>
        );
    };