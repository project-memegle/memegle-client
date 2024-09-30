import { useState } from 'react';
import Upload from '../../../pages/Upload';
import useNavigateHandler from '../../../hooks/useNavigateHandler';

export default function SideBar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigateHandler();

    function showModal() {
        setModalIsOpen(true); // 모달을 열기 위해 true로 설정
    }

    function hideModal() {
        setModalIsOpen(false); // 모달을 닫기 위해 false로 설정
    }
    function clickHandler() {
        navigate(`/favorite`);
    }
    return (
        <aside>
            {modalIsOpen && <Upload onClose={hideModal} />}
            <ul>
                <li>
                    <button
                        onClick={() => {
                            showModal();
                        }}
                    >
                        이미지 업로드
                    </button>
                </li>
                <li>
                    <button onClick={clickHandler}>즐겨찾기</button>
                </li>
            </ul>
        </aside>
    );
}
