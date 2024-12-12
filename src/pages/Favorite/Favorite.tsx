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

import FavoriteItemWrapper from './FavoriteItemWrapper';
import FavoriteItem from './FavoriteItem';
import MOCK_FAVORITE_LIST from 'mockData/__FavoriteList';
import {
    SearchResultItemDTO,
    SearchResultSectionDTO,
} from 'services/dto/ResultDto';
import {
    getArraySessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import ToastMessage from 'components/UI/ToastMessage/ToastMessage';
import getValidationMessages from 'components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/UI/ToolTip';
import ImageModal from 'components/UI/Result/ImageModal';

export const SESSION_STORAGE_KEY = 'favoriteList';

export default function Favorite() {
    const [items, setItems] =
        useState<SearchResultSectionDTO>(MOCK_FAVORITE_LIST);
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const tootTipMessage = t('FAVORITE_TOOLTIP');

    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(true);

    const [activeItem, setActiveItem] = useState<SearchResultItemDTO>();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
    const [modalTagList, setModalTagList] = useState<string[]>([]);

    useEffect(() => {
        const originFavoriteList = getArraySessionStorages(SESSION_STORAGE_KEY);
        if (originFavoriteList && originFavoriteList.length > 0) {
            setItems((prev) => ({
                ...prev,
                results: originFavoriteList.map((item) => ({
                    ...item,
                    imageCategory: '',
                    createdAt: '',
                    modifiedAt: '',
                    tagList: item.tagList,
                })),
            }));
        } else {
            const favoriteList = items.results;
            setArraySessionStorages({
                key: SESSION_STORAGE_KEY,
                value: favoriteList.map((item) => ({
                    id: item.id,
                    imageUrl: item.imageUrl,
                    imageCategory: item.imageCategory,
                    createdAt: item.createdAt,
                    modifiedAt: item.modifiedAt,
                    tagList: item.tagList,
                })),
            });
        }
    }, []);

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleOpenModal = (imageUrl: string, tagList: string[]) => {
        setModalImageUrl(imageUrl);
        setModalTagList(tagList);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setModalImageUrl('');
        setModalTagList([]);
    };

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
        const itemIds = items.results.map((item) => ({
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

    const handleDeleteItem = (itemId: number) => {
        setItems((prev) => {
            const updatedItems = prev.results.filter(
                (item) => item.id !== itemId
            );
            setArraySessionStorages({
                key: SESSION_STORAGE_KEY,
                value: updatedItems.map((item) => ({
                    id: item.id,
                    imageUrl: item.imageUrl,
                    tagList: item.tagList,
                })),
            });
            return { ...prev, results: updatedItems };
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
                    items={items.results.map((item) => item.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="c-favorite__grid">
                        {items.results.map((item) => (
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
            {modalVisible && (
                <ImageModal
                    imageUrl={modalImageUrl}
                    onClose={handleCloseModal}
                    tagList={modalTagList}
                />
            )}
        </main>
    );
}
