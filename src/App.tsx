import React from 'react';
import './App.css';

function Header() {
  return <h1>自己紹介</h1>;
}

function Introduction() {
  return <p>こんにちは、私の名前はCursorBotです。</p>;
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <Introduction />
    </div>
  );
}

export default App;