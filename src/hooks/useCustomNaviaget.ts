import { useNavigate } from 'react-router-dom';
import { savePreviousUrl } from 'utils/Event/saveUrl';

/**
 *
 * @returns customNavigate
 */
const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (to: string, options?: any) => {
        const currentPath = window.location.pathname; // 현재 경로 가져오기
        savePreviousUrl(currentPath);
        navigate(to, options); // 원래 navigate 함수 호출
    };

    return customNavigate;
};

export default useCustomNavigate;
