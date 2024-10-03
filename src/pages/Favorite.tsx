import React, { useState, useEffect } from 'react';
import { SortableStressTest as Example } from '../components/UI/DnD/DnDtest';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const images = import.meta.glob<{ default: string }>(
    '../../public/tempImages/*.{png,jpg,jpeg,svg,webp}'
);

export default function Favorite() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const urls = await Promise.all(
                Object.keys(images).map(async (key) => {
                    const image = await images[key]();
                    return image.default;
                })
            );
            setImageUrls(urls);
        };

        loadImages();
    }, []);

    const handleDragStart = (
        e: React.DragEvent<HTMLImageElement>,
        url: string
    ) => {
        e.dataTransfer.setData('text/plain', url);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const url = e.dataTransfer.getData('text/plain');
        console.log('Dropped image URL:', url);
    };

    return (
        <div className="favorite-container">
            <h1>Favorite Images</h1>
            <div
                className="images-grid"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Favorite ${index + 1}`}
                        className="favorite-image"
                        draggable
                        onDragStart={(e) => handleDragStart(e, url)}
                    />
                ))}
            </div>
            <div>
                <DndProvider backend={HTML5Backend}>
                    <Example />
                </DndProvider>
            </div>
        </div>
    );
}
