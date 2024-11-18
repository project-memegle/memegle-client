import { HTMLAttributes } from 'react';
import { CSS } from '@dnd-kit/utilities';
import FavoriteItem from './FavoriteItem';
import { useSortable } from '@dnd-kit/sortable';
import { SearchResultItemDTO } from 'services/dto/ResultDto';

type FavoriteItemWrapper = {
    item: SearchResultItemDTO;
} & HTMLAttributes<HTMLDivElement>;

const FavoriteItemWrapper = ({ item, ...props }: FavoriteItemWrapper) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
    };

    return (
        <FavoriteItem
            item={item}
            ref={setNodeRef}
            style={styles}
            isOpacityEnabled={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};
export default FavoriteItemWrapper;
