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

    // for input methods detection
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(items.find((item) => item.id === active.id));
    };

    // triggered when dragging ends
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
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(4, 1fr)`,
                            gridGap: 16,
                            maxWidth: '800px',
                            margin: '16px auto 48px',
                        }}
                    >
                        {items.map((item) => (
                            <FavoriteItemWrapper key={item.id} item={item} />
                        ))}
                    </div>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <button
                            onClick={handleButtonClick}
                            style={{
                                appearance: 'none',
                                fontFamily: 'inherit',
                                display: 'inline-block',
                                border: '0',
                                borderRadius: '5px',
                                background: '#14af21',
                                color: '#fff',
                                padding: '10px 16px',
                                fontSize: '1rem',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            Save this order
                        </button>
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
