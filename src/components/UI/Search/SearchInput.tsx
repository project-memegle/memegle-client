import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchInput() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  function clickHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    navigate('/result');
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="c-input">
        <button
          className="c-input__icon c-input__icon--front"
          onClick={clickHandler}
        >
          <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
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
            onClick={clickHandler}
          >
            <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}