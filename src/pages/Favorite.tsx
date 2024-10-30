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
import FavoriteItem from 'components/UI/Favorite/FavoriteItem';
import FavoriteItemWrapper from 'components/UI/Favorite/FavoriteItemWrapper';
import { useState } from 'react';

export type TItem = {
    id: number;
    imageUrl: string;
};

const defaultItems = [
    { id: 1, imageUrl: '../public/tempImages/test2.jpeg' },
    { id: 2, imageUrl: '../public/tempImages/test1.jpeg' },
    { id: 3, imageUrl: '../public/tempImages/test3.jpeg' },
    { id: 4, imageUrl: '../public/tempImages/test4.jpeg' },
    { id: 5, imageUrl: '../public/tempImages/test5.jpeg' },
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
        console.log('qweqwe', event);
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
