import emptyIcon from '@memegle/assets/images/png/img_result_empty.webp';

export default function EmptyForm() {
    return (
        <div className="c-result__emtpy">
            <img src={emptyIcon} alt="empty" />
        </div>
    );
}
