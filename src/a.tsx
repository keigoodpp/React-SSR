import React, { useState, useEffect, useRef } from "react";
import Particle from './particles.js'; // Import the Particle class
import ScoreBar from './ScoreBar';
import { useSelector } from 'react-redux'; // 追加
import { selectRemovedStars } from './redux/removedStarsSlice'; // 追加

function StarParticle() {
  // アニメーションの状態を管理する新たな状態変数
  const [isAnimating, setIsAnimating] = useState(true);
  const removedStarsCount = useSelector(selectRemovedStars); // 消えた星の数を取得
  const particlesArray = useRef<Particle[]>([]);
  
  let mouseX = window.innerWidth * 2;
  let mouseY = window.innerHeight * 2;
  
  useEffect(() => {
    const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const baseParticlesCount = 50;
    const particlesCount = Math.min(baseParticlesCount + removedStarsCount * 5, 500); // 消えた星の数に基づいてparticlesCountを増やすが、最大値は500

    // 新しいパーティクルを生成して追加
    
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  
    resizeCanvas(); // 初期サイズ設定
  
    for (let i = particlesArray.current.length; i < particlesCount; i++) {
      particlesArray.current.push(new Particle(ctx, canvas.width, canvas.height, removedStarsCount, Math.random() * canvas.width, Math.random() * canvas.height, i));
    }
  
    let animationFrameId: number;
  
    function animateParticles() {
      if (!isAnimating) {
        cancelAnimationFrame(animationFrameId); // アニメーションがオフの場合、ここで終了
        return;
      }
  
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Change this line
  
      for (let i = 0; i < particlesArray.current.length; i++) {
        particlesArray.current[i].mouseEffect(mouseX, mouseY);
        particlesArray.current[i].update(mouseX, mouseY);
        particlesArray.current[i].draw();
        if (particlesArray.current[i].size <= 0.2) {
          particlesArray.current[i].resetParticle();
        }
      }
  
      animationFrameId = requestAnimationFrame(animateParticles);
    }
  
    animateParticles();
  
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating, removedStarsCount]); // isAnimatingが変更されたときにeffectを再実行

  return (
    <div style={{ position: 'relative' }}>
    <canvas id="particles-canvas"></canvas>
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <ScoreBar />
    </div>
      <div className="signup-container">
        <button className="animation-toggle" onClick={() => setIsAnimating(!isAnimating)}>
          {isAnimating ? "Stop Animation" : "Start Animation"}
        </button>
        <div>Removed stars: {removedStarsCount}</div> {/* 消えた星の数を表示 */}
      </div>
    </div>
  );
}

export default StarParticle;