import { useEffect, FC } from 'react';
import './ScoreIncrement.css'; // CSSファイル

interface ScoreIncrementProps {
  top: number;
  left: number;
  onEnd: () => void;
}

const ScoreIncrement: FC<ScoreIncrementProps> = ({ top, left, onEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onEnd, 400); // 1秒後に消える
    return () => clearTimeout(timer);
  }, []); // 依存配列を空にする

  return (
    <div className="score-increment"　style={{ position: 'absolute', top: `${top - 1}%`, left: `${left + 1}%` }}>
      +1
    </div>
  );
}

export default ScoreIncrement;