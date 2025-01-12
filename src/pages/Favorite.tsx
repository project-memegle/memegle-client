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
import { useEffect, useState } from 'react';

import { SearchResultItemDTO } from 'services/dto/ResultDto';
import {
    getSessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/UI/ToolTip';
import ImageModal from 'components/UI/Result/ImageModal';
import FavoriteItemWrapper from 'components/UI/Favorite/FavoriteItemWrapper';
import FavoriteItem from 'components/UI/Favorite/FavoriteItem';
import StorageKeyword from 'Constant/StorageKeyword';
import { getFavoriteItems } from 'services/FavoriteService';

export const SESSION_STORAGE_KEY = 'favoriteList';

export default function Favorite() {
    const [items, setItems] = useState<SearchResultItemDTO[]>([]);
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const tootTipMessage = t('FAVORITE_TOOLTIP');

    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(true);

    const [activeItem, setActiveItem] = useState<SearchResultItemDTO | null>(
        null
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedResult, setSelectedResult] =
        useState<SearchResultItemDTO | null>(null);

    useEffect(() => {
        const userId = getSessionStorages(StorageKeyword.USER_UID);
        if (!userId) return;
        getFavoriteItems(userId)
            .then((items) => {
                console.log('Favorite items:', items);
                setItems(items);
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleOpenModal = (selectedResult: SearchResultItemDTO) => {
        setSelectedResult(selectedResult);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedResult(null);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(items.find((item) => item.id === active.id) || null);
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
            setItems((prev) => arrayMove(prev, activeIndex, overIndex));
        }
        setActiveItem(null);
    };

    const handleDragCancel = () => {
        setActiveItem(null);
    };

    const handleButtonClick = () => {
        const itemIds = items.map((item) => ({
            id: item.id,
            imageUrl: item.imageUrl,
            tagList: item.tagList,
        }));
        setArraySessionStorages({
            key: SESSION_STORAGE_KEY,
            value: itemIds,
        });
        try {
            setToastMessage(t('SAVED_CHANGES'));
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    };

    const handleDeleteItem = (itemId: string) => {
        setItems((prev) => {
            const updatedItems = prev.filter((item) => item.id !== itemId);
            setArraySessionStorages({
                key: SESSION_STORAGE_KEY,
                value: updatedItems.map((item) => ({
                    id: item.id,
                    imageUrl: item.imageUrl,
                    tagList: item.tagList,
                })),
            });
            return updatedItems;
        });
    };

    async function handleToast() {
        try {
            setToastMessage(ValidationMessages.SUCCESS_DELETE_IMG);
            setToast(true);
        } catch (error) {
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    function closeTooltip() {
        setTooltipVisible(false);
    }

    return (
        <main className="home__main c-favorite">
            {tooltipVisible && (
                <Tooltip message={tootTipMessage} onClose={closeTooltip} />
            )}
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
                    {t('SAVING_CHANGES')}
                </button>
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="c-favorite__grid">
                        {items.map((item) => (
                            <FavoriteItemWrapper
                                key={item.id}
                                item={item}
                                onDelete={handleDeleteItem}
                                onSave={handleToast}
                                onOpenModal={handleOpenModal}
                            />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                    {activeItem ? (
                        <FavoriteItem
                            item={activeItem}
                            onDelete={handleDeleteItem}
                            onSave={handleToast}
                            onOpenModal={handleOpenModal}
                            isDragging
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
            {modalVisible && selectedResult && (
                <ImageModal
                    onClose={handleCloseModal}
                    result={selectedResult}
                    onImageLoad={() => {}}
                    handleDownloadSuccess={() => {}}
                    onOpenModal={handleOpenModal}
                />
            )}
        </main>
    );
}
