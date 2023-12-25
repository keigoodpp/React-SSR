import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRemovedStars } from './redux/removedStarsSlice';
import './ScoreBar.css'; // CSSファイルをインポート

const ScoreBar = () => {
  const removedStarsCount = useSelector(selectRemovedStars);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const barWidth = Math.min((removedStarsCount / 500) * windowWidth, windowWidth); // removedStarsCountの値を500で割り、その結果を画面幅に掛け、最大値を画面幅に制限

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1, height: '20px', backgroundColor: '#ddd' }}>
        <div className="rainbow" style={{ width: `${barWidth}px`, height: '100%' }} /> {/* 幅をピクセルで設定 */}
      </div>
      <div style={{ marginLeft: '10px' }}>{removedStarsCount}</div>
    </div>
  );
};

export default ScoreBar;