import React from 'react';
import StarParticle from './a'; // a.tsxからSignupコンポーネントをインポート
import Svg from './svg'; // svg.tsxからSvgコンポーネントをインポート

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <StarParticle /> {/* Signupコンポーネントをレンダリング */}
      </div>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Svg /> {/* Svgコンポーネントをレンダリング */}
      </div>
    </div>
  );
}

export default App;