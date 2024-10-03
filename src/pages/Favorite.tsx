import { SortableStressTest as Example } from '../components/UI/DnD/DnDtest';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Favorite() {
    return (
        <div className="favorite-container">
            <h1>Favorite Images</h1>
            <div>
                <DndProvider backend={HTML5Backend}>
                    <Example />
                </DndProvider>
            </div>
        </div>
    );
}
