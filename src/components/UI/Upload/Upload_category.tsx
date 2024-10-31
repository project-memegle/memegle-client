import { useRef, useEffect, useState } from 'react';

export function CategoryInput() {
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
        };

        const handleTagInputKeyDown = (e: KeyboardEvent) => {
            let value = tagInput.value.trim(); // 자동으로 앞뒤 공백 제거
            // 띄어쓰기를 포함한 값이 있으면 그 값을 제거합니다
            if (value.includes(' ')) {
                value = value.replace(/\s+/g, ''); // 모든 띄어쓰기 제거
                tagInput.value = value;
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

    return (
        <section id="file-tag" ref={tagAreaRef} className="file-tag">
            <label
                id="file-tag-label"
                ref={labelRef}
                className="file-tag__label"
            >
                카테고리 등록
            </label>
            <input
                id="tag-input"
                ref={tagInputRef}
                type="text"
                className="file-tag__input"
            />
        </section>
    );
}
