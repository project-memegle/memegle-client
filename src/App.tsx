import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <section>
        <h1>memegle</h1>
          <p>당신이 원하는 모든 밈</p>
          <section className='frame-input'>
            <label htmlFor="">search</label>
            <div>
                <input type="text" placeholder='검색어를 입력해주세요'/>
                <figure>
                  <img src="" alt="" />
                </figure>
            </div>
          </section>
        </section>
        <section className='main-image-container'>
        <div className='image-item-wrapper'></div>
      </section>
    </div>
  );
}

export default App;
