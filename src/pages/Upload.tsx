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
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            alert('허용되지 않는 파일 형식입니다.');
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
