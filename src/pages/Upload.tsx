import axios, { AxiosError } from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { ChangeEvent, FormEvent, useState } from 'react';
import { handleApiError } from 'utils/handleApiError';
import { TagInput } from 'components/UI/Upload/Upload_tag';
import { CategoryInput } from 'components/UI/Upload/Upload_category';

export default function Upload() {
    const [file, setFile] = useState<File | undefined>();
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState<string>('파일을 선택하세요');
    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
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
                alert('허용되지 않는 파일 형식입니다.');
                return;
            }

            if (selectedFile.size > maxSizeInBytes) {
                alert('파일 크기가 5MB를 초과합니다.');
                return;
            }

            setFile(selectedFile);
        }
    };

    const upload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('파일을 선택하세요');
            return;
        }
        const formData = new FormData();
        formData.append('userfile', file);
        try {
            const response = await axios.post(`/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (error) {
            handleApiError(error as AxiosError, setErrorMessage);
        }
    };

    return (
        <div className="main__container">
            <form
                onSubmit={upload}
                encType="multipart/form-data"
                className="c-upload"
            >
                <section className="file-upload">
                    <div className="file-upload__area">
                        <i className="file-upload__icon c-icon">upload_file</i>
                        <h4>파일을 드래그하여 업로드하세요</h4>
                    </div>
                    <div className="file-upload__list">
                        <div className="file-info">
                            <span className="material-icons-outlined file-icon">
                                description
                            </span>
                            <span className="file-name"> </span> |
                            <span className="file-size"> </span>
                        </div>
                        <span className="material-icons remove-file-icon">
                            delete
                        </span>
                        <div className="progress-bar"> </div>
                    </div>
                    <button type="button" className="file-upload__button">
                        Upload
                    </button>
                </section>
                <TagInput />
                <CategoryInput />
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
