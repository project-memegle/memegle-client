interface SuccessMessageProps {
    message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) =>
    message && <p className="success-message">{message}</p>;

export default SuccessMessage;
