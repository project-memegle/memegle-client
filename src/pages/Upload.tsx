import axios, { AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { TagInput } from 'components/UI/Upload/Upload_tag';
import { CategoryInput } from 'components/UI/Upload/Upload_category';
import { handleApiError } from 'utils/API/handleApiError';
import { post } from 'utils/API/fetcher';
import { UploadDTO } from 'services/dto/UploadDto';
import handleKeyDown from 'utils/Event/preventEnter';

export default function Upload() {
    const [file, setFile] = useState<File | undefined>();
    const [tags, setTags] = useState<string[] | string>('');
    const [category, setCategory] = useState<string | undefined>();

    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState<string>('파일을 선택하세요');
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        handleFile(selectedFile);
    };

    const handleFile = (selectedFile: File | undefined) => {
        const allowedTypes = [
            'image/gif',
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
        ];
        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (selectedFile) {
            if (!allowedTypes.includes(selectedFile.type)) {
                alert(ValidationMessages.INVALID_FILE_FORMAT);
                return;
            }

            if (selectedFile.size > maxSizeInBytes) {
                alert(ValidationMessages.INVALID_FILE_SIZE);
                return;
            }

            setFile(selectedFile);
            setFileName(selectedFile.name);
            setImageUrl(URL.createObjectURL(selectedFile));
        }
    };

    const resetFile = () => {
        setFile(undefined);
        setFileName('파일을 선택하세요');
        setImageUrl(undefined);
    };

    const upload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('파일을 선택하세요');
            return;
        }
        const formData = new FormData();
        formData.append('memeImageFile', file);
        formData.append('tags', Array.isArray(tags) ? tags.join(',') : tags);
        formData.append('delimiter', ',');

        try {
            const response = await post(
                `/images?imageCategory=${category}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
        } catch (error) {
            handleApiError(error as AxiosError, setErrorMessage);
        }
    };

    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const selectedFile = e.dataTransfer.files?.[0];
        handleFile(selectedFile);
    };

    return (
        <div className="main__container">
            <form
                onSubmit={upload}
                encType="multipart/form-data"
                className="c-upload"
                onKeyDown={handleKeyDown}
            >
                <section
                    className={`file-upload ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="file-upload__area">
                        {imageUrl ? (
                            <>
                                <button
                                    className="file-upload__delete"
                                    onClick={resetFile}
                                >
                                    <i className="c-icon">delete</i>
                                </button>
                                <img
                                    src={imageUrl}
                                    alt="Uploaded file preview"
                                    className="file-upload__preview"
                                />
                            </>
                        ) : (
                            <>
                                <i className="file-upload__icon c-icon">
                                    upload_file
                                </i>
                                <h4>파일을 드래그하여 업로드하세요</h4>
                                <input
                                    className="file-upload__input"
                                    type="file"
                                    onChange={onChangeFile}
                                    ref={fileInputRef}
                                />
                            </>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleUploadButtonClick}
                        className="file-upload__button"
                    >
                        이미지 업로드
                    </button>
                </section>
                <TagInput onTagsChange={setTags} />
                <CategoryInput onCategoryChange={setCategory} />
                <section className="c-login__button-section">
                    <button
                        className="button__rounded button__light"
                        type="submit"
                    >
                        이미지 업로드 요청
                    </button>
                    {errorMessage && (
                        <p className="font-warning">{errorMessage}</p>
                    )}
                </section>
            </form>
        </div>
    );
}
