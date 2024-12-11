interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) =>
    message && <p className="error-message">{message}</p>;

export default ErrorMessage;
