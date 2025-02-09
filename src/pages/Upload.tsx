import { ChangeEvent, useRef, useState } from 'react';
import { TagInput } from 'components/UI/Upload/Upload_tag';
import { CategoryInput } from 'components/UI/Upload/Upload_category';
import { handleApiError } from 'utils/API/handleApiError';
import handleKeyDown from 'utils/Event/preventEnter';
import { setSessionStorages } from 'utils/Storage/sessionStorage';
import useCustomNavigate from 'hooks/useCustomNaviaget';
import StorageKeyword from 'Constant/StorageKeyword';
import getValidationMessages from '../components/Validations/ValidationMessages';
import { useTranslation } from 'react-i18next';
import uploadService from 'services/UploadService';
import { SubmitButton } from 'components/UI/Buttons'
import { FormProvider, useForm } from 'react-hook-form';

export default function Upload() {
    const ValidationMessages = getValidationMessages();
    const { t } = useTranslation();
    const [file, setFile] = useState<File | undefined>();
    const [tagList, setTaglist] = useState<string[] | string>('');
    const [category, setCategory] = useState<string | undefined>();
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState<string>(t('REQUIRED_UPLOAD_FILE'));
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const navigate = useCustomNavigate();
    const [isPending, setIsPending] = useState(false);
    const methods = useForm();
    const { handleSubmit } = methods;
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
        const maxSizeInMB = 1;
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
        setFileName(t('REQUIRED_UPLOAD_FILE'));
        setImageUrl(undefined);
    };
    const onSubmit = async (data: any) => {
        if (!file) {
            setErrorMessage(t('REQUIRED_UPLOAD_FILE'));
            return;
        }
        if (tagList.length === 0) {
            setErrorMessage(t('REQUIRED_UPLOAD_TAG'));
            return;
        }
        if (!category) {
            setErrorMessage(t('REQUIRED_UPLOAD_CATEGORY'));
            return;
        }
        try {
            setIsPending(true);
            await uploadService(
                'userId',
                file,
                category,
                Array.isArray(tagList) ? tagList : tagList.split(',')
            );

            setSessionStorages({
                key: StorageKeyword.UPLOAD_SUCCESS,
                value: StorageKeyword.TRUE,
            });
            navigate('/');
        } catch (error) {
            handleApiError(error, setErrorMessage);
        } finally {
            setIsPending(false);
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
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                    className="c-upload"
                    onKeyDown={handleKeyDown}
                >
                    <section
                        className={`file-upload ${
                            isDragging ? 'dragging' : ''
                        }`}
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
                                    <h4>{t('REQUIRED_DND_FILE')}</h4>
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
                            {t('IMAGE_UPLOAD')}
                        </button>
                    </section>
                    <TagInput
                        onTagsChange={setTaglist}
                        setErrorMessage={setErrorMessage}
                    />
                    <CategoryInput
                        onCategoryChange={setCategory}
                        setErrorMessage={setErrorMessage}
                    />
                    {errorMessage && (
                        <p className="font-warning">{errorMessage}</p>
                    )}
                    <SubmitButton isPending={isPending} text="ASKED_UPLOAD" />
                </form>
            </FormProvider>
        </div>
    );
}
