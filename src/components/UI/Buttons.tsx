import { ReloadIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

export function SubmitButton({
    isPending,
    text,
}: {
    isPending: boolean;
    text: string;
}) {
    const { t } = useTranslation();
    return (
        <button
            className="button__rounded button__orange"
            type="submit"
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                t(text)
            )}
        </button>
    );
}
