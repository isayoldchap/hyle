import React from 'react';
import './game-screen.style.css';
import { Screen } from '../screen/screen';
import { GameBoard } from '../game-board/game-board';
import blueTriangleImage from '../game-board/game-pieces/game-piece-blue-triangle-600.png';

export const GameScreen = () => {
  return (
    <Screen>
      <div
        style={{
          width: '90vw',
          minWidth: '360px',
          maxWidth: '960px',
          minHeight: '480px',
          maxHeight: '960px',
          margin: '0 auto',
          height: '65vh'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', margin: '1rem 0' }}>
          <div
            style={{ margin: '0 1rem', padding: '1rem', flex: 2, background: 'rgba(0,0,0,.05)', textAlign: 'center' }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, border: '1px solid #bbb' }}>
                <h3>Ingrid</h3>
              </div>
              <div style={{ flex: 1, border: '1px solid #bbb' }}>
                <h3 style={{ color: 'green' }}>834</h3>
              </div>
            </div>
            <h2 style={{ marginTop: '.5rem' }}>Chaos</h2>
            <h4>Place the next piece</h4>
          </div>
          <div style={{ flex: 1, textAlign: 'center', maxWidth: '14.29%' }}>
            <img alt="game piece" src={blueTriangleImage} style={{ cursor: 'grab' }} />
          </div>

          <div
            style={{ margin: '0 1rem', padding: '1rem', flex: 2, background: 'rgba(0,0,0,.05)', textAlign: 'center' }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, border: '1px solid #bbb' }}>
                <h3>Steve</h3>
              </div>
              <div style={{ flex: 1, border: '1px solid #bbb' }}>
                <h3 style={{ color: 'red' }}>42</h3>
              </div>
            </div>
            <h2 style={{ marginTop: '.5rem' }}>Order</h2>
            <h4>{/* instructions here */}</h4>
          </div>
        </div>
        <GameBoard />
      </div>
    </Screen>
  );
};
