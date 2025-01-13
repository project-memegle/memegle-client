import { useState, useEffect } from 'react';

type ProgressiveImgProps = {
    placeholderSrc?: string;
    src: string;
    alt?: string;
};

const ProgressiveImg = ({
    placeholderSrc,
    src,
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
    return (
        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ''}
            className={`image ${customClass}`}
        />
    );
};
export default ProgressiveImg;
