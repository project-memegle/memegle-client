import useNavigateHandler from '../../../hooks/useNavigateHandler';

export default function SideBar() {
    const navigate = useNavigateHandler();

    function navigateToFavorite() {
        navigate(`/favorite`);
    }
    function navigateToUpload() {
        navigate(`/upload`);
    }
    return (
        <aside>
            <ul>
                <li>
                    <button onClick={navigateToUpload}>이미지 업로드</button>
                </li>
                <li>
                    <button onClick={navigateToFavorite}>즐겨찾기</button>
                </li>
            </ul>
        </aside>
    );
}
