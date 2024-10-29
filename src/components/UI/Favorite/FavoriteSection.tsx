import { HTMLAttributes, useState } from 'react';
import FavoriteItem, { FavoriteItemType } from './FavoriteItem';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type FavoriteItemProps = {
    item: FavoriteItemType;

} & HTMLAttributes<HTMLDivElement>;

export default function FavoriteSection({ item, ...props }: FavoriteItemProps) {
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
        <>
            {favoriteArray.map((favoriteItem: FavoriteItemType) => (
                <FavoriteItem
                    key={favoriteItem.id}
                    item={favoriteItem}
                    ref={setNodeRef}
                    style={styles}
                    isOpacityEnabled={isDragging}
                    {...props}
                    {...attributes}
                    {...listeners}
                />
            ))}
        </>
    );
}
