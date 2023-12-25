import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { increment } from './redux/removedStarsSlice';
import ScoreIncrement from './ScoreIncrement';

const starPath = "M50,5 60,40 100,40 70,60 80,95 50,75 20,95 30,60 0,40 40,40 Z";

function Svg() {
  const starSize = 30;
  const generateStars = () => Array.from({ length: 100 }, () => ({
    id: uuidv4(),
    top: Math.random() * (100 - 9.05),
    left: Math.random() * (100 - 5.18),
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    size: starSize,
    isNear: false
  }));
  const [stars, setStars] = useState(generateStars());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [allStarsGone, setAllStarsGone] = useState(false);
  const dispatch = useDispatch();
  interface ScoreIncrementItem {
    id: string;
    top: number;
    left: number;
  }
  const [scoreIncrements, setScoreIncrements] = useState<ScoreIncrementItem[]>([]);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX / window.innerWidth * 100, y: ev.clientY / window.innerHeight * 100 });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const newStars = stars.map(star => {
      if (star.isNear) {
        return star;
      }

      const dx = mousePosition.x - (star.left + 2.59);
      const dy = mousePosition.y - (star.top + 4.52);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5) {
        dispatch(increment());
        setScoreIncrements(prev => [...prev, { id: star.id, top: star.top, left: star.left }]);
        return { ...star, isNear: true };
      } else {
        return star;
      }
    });

    setStars(newStars);
    if (newStars.every(star => star.isNear)) {
      setAllStarsGone(true);
    }
  }, [mousePosition, dispatch]);

  useEffect(() => {
    if (allStarsGone) {
      setStars(generateStars());
      setAllStarsGone(false);
    }
  }, [allStarsGone]);

  return (
    <div className="app-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {stars.map((star) => (
        <motion.svg key={star.id} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: `${star.size}px`, height: `${star.size}px`, position: 'absolute', top: `${star.top}%`, left: `${star.left}%` }}>
          <motion.path
            fill="none"
            stroke={star.color}
            strokeWidth="5"
            d={starPath}
            initial={{ pathLength: 0, opacity: 0, scale: 1 }}
            animate={star.isNear ? { scale: [1, 0.5, 1], opacity: [1, 0] } : { pathLength: 1, opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.svg>
      ))}
      {scoreIncrements.map(({ id, top, left }) => (
        <ScoreIncrement
          key={id}
          top={top}
          left={left}
          onEnd={() => setScoreIncrements(prev => prev.filter(increment => increment.id !== id))}
        />
      ))}
    </div>
  );
}

export default Svg;