import React from 'react';
import './game-screen.style.css';
import { Screen } from '../screen/screen';
import { GameBoard } from '../game-board/game-board';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { GamePiece } from '../game-piece/game-piece';
import { DND_ITEM_TYPES } from '../../constants/dnd-item-types';

export const GameScreen = () => {
  return (
    <DndProvider backend={Backend}>
      <Screen>
        <div
          style={{
            width: '90vw',
            minWidth: '360px',
            maxWidth: '960px',
            minHeight: '480px',
            maxHeight: '960px',
            margin: '0 auto',
            height: '65vh',
            marginTop: 70
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
              <GamePiece dndType={DND_ITEM_TYPES.CHAOS_PIECE} variant="pink" />
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
    </DndProvider>
  );
};
