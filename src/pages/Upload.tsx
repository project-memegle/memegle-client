import { useEffect, useRef } from 'react';

import Modal, { ModalHandle } from '../components/UI/Modal/ModalSection';

type UploadProps = {
    onClose: () => void;
};

export default function Upload({ onClose }: UploadProps) {
    const modal = useRef<ModalHandle>(null);

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    return (
        <Modal ref={modal} onClose={onClose}>
            <section>
                이미지업로드
                <button onClick={onClose}>닫기</button>
            </section>
        </Modal>
    );
}
