import { HTMLAttributes } from 'react';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import MyImageItem from './MyImageItem';

type MyImageItemWrapperProps = {
    item: SearchResultItemDTO;
    onDelete: (id: string) => void;
    onSave: () => void;
    onOpenModal: (selectedResult: SearchResultItemDTO) => void;
} & HTMLAttributes<HTMLDivElement>;

const MyImageItemWrapper = ({
    item,
    onDelete,
    onSave,
    onOpenModal,
    ...props
}: MyImageItemWrapperProps) => {
    return (
        <MyImageItem
            item={item}
            onDelete={onDelete}
            onSave={onSave}
            onOpenModal={onOpenModal}
            {...props}
        />
    );
};
export default MyImageItemWrapper;
