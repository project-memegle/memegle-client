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
    getArraySessionStorages,
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
import { deleteFavoriteItem } from 'services/FavoriteService';
import EmptyForm from 'components/UI/EmptyForm';
import useCustomNavigate from 'hooks/useCustomNaviaget';

export default function Favorite() {
    const [items, setItems] = useState<any[]>([]);
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const navigate = useCustomNavigate();
    const tootTipMessage = t('FAVORITE_TOOLTIP');

    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(true);

    const [activeItem, setActiveItem] = useState<SearchResultItemDTO | null>(
        null
    );
    const [userUId, setUserUId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedResult, setSelectedResult] =
        useState<SearchResultItemDTO | null>(null);

    useEffect(() => {
        const favoriteItems = getArraySessionStorages(
            StorageKeyword.FAVORITE_ITEMS
        );
        if (!favoriteItems) return;
        setItems(favoriteItems);
        const userId = getSessionStorages(StorageKeyword.USER_UID);
        setUserUId(userId);
        if (!userUId) return;
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
        setArraySessionStorages({
            key: StorageKeyword.FAVORITE_ITEMS,
            value: items,
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
        if (!userUId) {
            navigate('/login');
            return;
        }
        deleteFavoriteItem(userUId, itemId);
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
        setArraySessionStorages({
            key: StorageKeyword.FAVORITE_ITEMS,
            value: updatedItems,
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
                {items.length === 0 && <EmptyForm />}
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
