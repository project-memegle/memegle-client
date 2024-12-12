import { FormEvent } from "react";

interface ButtonProps {
    className: string;
    type: 'button' | 'submit';
    onClick?: (e: FormEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const AuthButton = ({ className, type, onClick, children }: ButtonProps) => (
    <button className={className} type={type} onClick={onClick}>
        {children}
    </button>
);

export default AuthButton;
