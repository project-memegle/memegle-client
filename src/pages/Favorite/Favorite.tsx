import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import { useState } from 'react';

import image1 from '@memegle/assets/images/jpeg/test1.jpeg';
import image2 from '@memegle/assets/images/jpeg/test2.jpeg';
import image3 from '@memegle/assets/images/jpeg/test3.jpeg';
import image4 from '@memegle/assets/images/jpeg/test4.jpeg';
import image5 from '@memegle/assets/images/jpeg/test5.jpeg';
import FavoriteItemWrapper from './FavoriteItemWrapper';
import FavoriteItem from './FavoriteItem';

export type TItem = {
    id: number;
    imageUrl: string;
};

const defaultItems = [
    { id: 1, imageUrl: image1 },
    { id: 2, imageUrl: image2 },
    { id: 3, imageUrl: image3 },
    { id: 4, imageUrl: image4 },
    { id: 5, imageUrl: image5 },
];

export default function Favorite() {
    const [items, setItems] = useState<TItem[]>(defaultItems);
    const [activeItem, setActiveItem] = useState<TItem>();

    const sensors = useSensors(
        // useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(items.find((item) => item.id === active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeItem = items.find((item) => item.id === active.id);
        const overItem = items.find((item) => item.id === over.id);

        if (!activeItem || !overItem) {
            return;
        }

        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        if (activeIndex !== overIndex) {
            setItems((prev) => arrayMove<TItem>(prev, activeIndex, overIndex));
        }
        setActiveItem(undefined);
    };

    const handleDragCancel = () => {
        setActiveItem(undefined);
    };

    const handleButtonClick = () => {
        const itemIds = items.map((item) => item.id);
        alert(itemIds);
    };

    return (
        <main className="home__main c-favorite">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <button
                    className="c-favorite__button"
                    onClick={handleButtonClick}
                >
                    변경사항 저장하기
                </button>
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div className="c-favorite__grid">
                        {items.map((item) => (
                            <FavoriteItemWrapper key={item.id} item={item} />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                    {activeItem ? (
                        <FavoriteItem item={activeItem} isDragging />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </main>
    );
}
