import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSearchHistory, SEARCH_HISTORY } from 'utils/localstorage';

export default function SearchInput() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        addSearchHistory(inputValue);
        navigate('/result');
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const trimmedValue = event.target.value.trim();
        if (trimmedValue !== '') {
            setInputValue(event.target.value);
        }
    }

    function removeInputValue(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setInputValue('');
    }

    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="c-input">
                <button
                    className="c-input__icon c-input__icon--front"
                    onClick={clickHandler}
                >
                    <i className="c-icon">search</i>
                </button>
                <input
                    className="c-input__input"
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                {inputValue && (
                    <button
                        className="c-input__icon c-input__icon--back"
                        onClick={removeInputValue}
                    >
                        <i className="c-icon">close</i>
                    </button>
                )}
            </div>
        </form>
    );
}
