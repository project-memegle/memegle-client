import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState<File | undefined>();

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
            alert('성공');
        } catch (error) {
            alert('돌아가');
            console.log(error);
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
                <input type="submit" />
            </form>
        </div>
    );
}
