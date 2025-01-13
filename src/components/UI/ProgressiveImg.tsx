import { useState, useEffect } from 'react';

type ProgressiveImgProps = {
    placeholderSrc?: string;
    src: string;
    alt?: string;
    className?: string;
};

const ProgressiveImg = ({
    placeholderSrc,
    src,
    className,
    ...props
}: ProgressiveImgProps) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const customClass =
        placeholderSrc && imgSrc === placeholderSrc ? 'loading' : 'loaded';
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    const combinedClassName = `image ${customClass} ${className || ''}`.trim();

    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ''}
            className={combinedClassName}
        />
    );
};

export default ProgressiveImg;
