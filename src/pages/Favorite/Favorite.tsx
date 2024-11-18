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

import FavoriteItemWrapper from './FavoriteItemWrapper';
import FavoriteItem from './FavoriteItem';
import MOCK_FAVORITE_LIST from 'mockData/__FavoriteList';
import {
    SearchResultItemDTO,
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';
import { setArraySessionStorages } from 'utils/Storage/sessionStorage';

export const SESSION_STORAGE_KEY = 'favoriteList';

export default function Favorite() {
    const [items, setItems] =
        useState<SearchResultSectionDTO>(MOCK_FAVORITE_LIST);
    const [activeItem, setActiveItem] = useState<SearchResultItemDTO>();

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(items.results.find((item) => item.id === active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeItem = items.results.find((item) => item.id === active.id);
        const overItem = items.results.find((item) => item.id === over.id);

        if (!activeItem || !overItem) {
            return;
        }

        const activeIndex = items.results.findIndex(
            (item) => item.id === active.id
        );
        const overIndex = items.results.findIndex(
            (item) => item.id === over.id
        );

        if (activeIndex !== overIndex) {
            setItems((prev) => ({
                ...prev,
                results: arrayMove<SearchResultItemDTO>(
                    prev.results,
                    activeIndex,
                    overIndex
                ),
            }));
        }
        setActiveItem(undefined);
    };

    const handleDragCancel = () => {
        setActiveItem(undefined);
    };

    const handleButtonClick = () => {
        const itemIds = items.results.map((item) => item.id);
        setArraySessionStorages({ key: SESSION_STORAGE_KEY, value: itemIds });
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
                <SortableContext
                    items={items.results.map((item) => item.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="c-favorite__grid">
                        {items.results.map((item) => (
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
