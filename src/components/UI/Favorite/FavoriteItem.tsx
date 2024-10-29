import { StrictModeDroppable } from 'components/DnD/StrictModeDroppable';
import React, { useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';

interface FavoriteItem {
    id: string;
    url: string;
}

export default function FavoriteItemComponent() {
    const [favoriteArray, setFavoriteArray] = useState<FavoriteItem[]>([
        { id: '1', url: '../public/tempImages/test2.jpeg' },
        { id: '2', url: '../public/tempImages/test1.jpeg' },
        { id: '3', url: '../public/tempImages/test3.jpeg' },
        { id: '4', url: '../public/tempImages/test4.jpeg' },
        { id: '5', url: '../public/tempImages/test5.jpeg' },
    ]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(favoriteArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFavoriteArray(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="categoryItem">
                {(provided) => (
                    <div
                        className="categoryItem"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {favoriteArray.map((e: any, i: number) => (
                            <Draggable
                                draggableId={`test-${e.id}`}
                                index={i}
                                key={`test-${e.id}`}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <article className="category__item">
                                                <img
                                                    src={e.url}
                                                    alt={`img-${e.id}`}
                                                />
                                            </article>
                                        </div>
                                    );
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}
