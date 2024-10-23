import axios from 'axios';
import ValidationMessages from '../components/Validations/ValidationMessages';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | undefined>();
    const [message, setMessage] = useState('');

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
            alert('파일을 선택하세요');
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
            setMessage(response.data.message);
            alert(message);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                    case 40001:
                        setMessage(ValidationMessages.INVALID_FORM);
                        break;
                    case 40100:
                        setMessage(ValidationMessages.INVALID_USER);
                        break;
                    case 40401:
                        setMessage(ValidationMessages.NO_RESOURCE);
                        break;
                    case 50000:
                        setMessage(ValidationMessages.SERVER_ERROR);
                        break;
                    default:
                        setMessage(ValidationMessages.UNKNOWN_ERROR);
                        break;
                }
            } else {
                setMessage(ValidationMessages.UNKNOWN_ERROR);
            }
        }
    };

    return (
        <div>
            <form onSubmit={upload} encType="multipart/form-data">
                <input
                    type="file"
                    name="userfile"
                    onChange={onChangeFile}
                    accept=".gif,.jpg,.jpeg,.png,.webp"
                />
                <div>
                    <label htmlFor="category">카테고리</label>
                    <input id="category" type="text" />
                </div>
                <button type="submit">업로드 하기</button>
            </form>
        </div>
    );
}
