import { forwardRef } from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    className: string;
    isDuplicated?: boolean;
    isChecked?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            type,
            name,
            value,
            onChange,
            placeholder,
            className,
            isChecked,
            isDuplicated,
        },
        ref
    ) => (
        <div style={{ position: 'relative' }}>
            <label htmlFor={name}>{label}</label>
            <input
                autoComplete="on"
                ref={ref}
                className={className}
                name={name}
                type={type}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {isChecked &&
                (isDuplicated ? (
                    <i className="c-icon c-icon--fill-fail">close</i>
                ) : (
                    <i className="c-icon c-icon--fill-success">check</i>
                ))}
        </div>
    )
);
