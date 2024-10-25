import React, { useRef, useEffect, useState } from 'react';

export function TagInput() {
    const tagInputRef = useRef<HTMLInputElement>(null);
    const tagAreaRef = useRef<HTMLElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const [tags, setTags] = useState<string[]>([]);

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
            const value = tagInput.value;
            if (
                (e.key === ' ' ||
                    e.key === 'Enter' ||
                    value[value.length - 1] === ' ') &&
                !value.match(/^\s+$/gi) &&
                value !== ''
            ) {
                setTags((prevTags) => [...prevTags, value.trim()]);
                tagInput.value = '';
            }
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
            <li key={index} className="tag">
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
                태그 등록
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
