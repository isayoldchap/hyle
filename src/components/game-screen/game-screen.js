import React from 'react';
import './game-screen.style.css';
import { Screen } from '../screen/screen';
import { DndProvider } from 'react-dnd';
import { ConnectedGameBoard } from '../game-board/gameboard.connected';
import TouchBackend from 'react-dnd-touch-backend';

export const GameScreen = () => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Screen>
        {/* TODO: Set background styles with theme: */}
        <div
          className="game-screen-wrapper"
          style={{
            backgroundImage:
              'radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )'
          }}
        >
          <ConnectedGameBoard />
        </div>
      </Screen>
    </DndProvider>
  );
};
