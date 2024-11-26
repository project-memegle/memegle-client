import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TagInputProps {
    onTagsChange: (tags: string[]) => void;
    setErrorMessage: (message: string) => void; // 추가된 prop
}

export function TagInput({ onTagsChange, setErrorMessage }: TagInputProps) {
    const tagInputRef = useRef<HTMLInputElement>(null);
    const tagAreaRef = useRef<HTMLElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const [tags, setTags] = useState<string[]>([]);
    const { t } = useTranslation();
    useEffect(() => {
        onTagsChange(tags);
        setErrorMessage('');
    }, [tags, onTagsChange, setErrorMessage]);

    useEffect(() => {
        const tagInput = tagInputRef.current;
        const tagArea = tagAreaRef.current;
        const label = labelRef.current;

        if (!tagInput || !tagArea || !label) return;

        const handleTagAreaClick = () => {
            tagInput.focus();
        };

        const handleTagInputFocus = () => {
            tagArea.classList.add('active');
            label.classList.add('active');
        };

        const handleTagInputBlur = (e: FocusEvent) => {
            tagArea.classList.remove('active');
            if (tagInput.value === '' && tags.length === 0) {
                label.classList.remove('active');
            }
            if (!tagInput.value.match(/^\s+$/gi) && tagInput.value !== '') {
                setTags((prevTags) => [...prevTags, tagInput.value.trim()]);
                tagInput.value = '';
            }
        };

        const handleTagInputKeyDown = (e: KeyboardEvent) => {
            let value = tagInput.value.trim(); // 자동으로 앞뒤 공백 제거

            // 띄어쓰기를 포함한 값이 있으면 그 값을 제거합니다
            if (value.includes(' ')) {
                value = value.replace(/\s+/g, ''); // 모든 띄어쓰기 제거
                tagInput.value = value;
            }

            // 태그 추가 조건 (띄어쓰기가 없을 때만 추가)
            if ((e.key === ' ' || e.key === 'Enter') && value !== '') {
                setTags((prevTags) => [...prevTags, value]);
                tagInput.value = '';
            }

            // 태그 삭제 (입력 값이 비어 있을 때 Backspace 키를 누르면)
            if (e.key === 'Backspace' && value === '') {
                setTags((prevTags) => prevTags.slice(0, -1));
            }
        };

        tagArea.addEventListener('click', handleTagAreaClick);
        tagInput.addEventListener('focus', handleTagInputFocus);
        tagInput.addEventListener('blur', handleTagInputBlur);
        tagInput.addEventListener('keydown', handleTagInputKeyDown);

        return () => {
            tagArea.removeEventListener('click', handleTagAreaClick);
            tagInput.removeEventListener('focus', handleTagInputFocus);
            tagInput.removeEventListener('blur', handleTagInputBlur);
            tagInput.removeEventListener('keydown', handleTagInputKeyDown);
        };
    }, [tags]);

    const handleTagRemove = (index: number) => {
        setTags((prevTags) => prevTags.filter((_, idx) => idx !== index));
    };

    const renderTags = () => {
        return tags.map((tag, index) => (
            <li key={index} className="tag-list__item">
                {tag}
                <span
                    className="cross"
                    onClick={() => handleTagRemove(index)}
                ></span>
            </li>
        ));
    };

    return (
        <section id="file-tag" ref={tagAreaRef} className="file-tag">
            <label
                id="file-tag-label"
                ref={labelRef}
                className="file-tag__label"
            >
                {t('REGISTER_TAG')}
            </label>
            <input
                id="tag-input"
                ref={tagInputRef}
                type="text"
                className="file-tag__input"
            />
            <ul ref={ulRef} className="tag-list">
                {renderTags()}
            </ul>
        </section>
    );
}
