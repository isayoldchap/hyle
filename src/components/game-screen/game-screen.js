import React from 'react';
import './game-screen.style.css';
import { Screen } from '../screen/screen';
import { DndProvider } from 'react-dnd';
import { ConnectedGameBoard } from '../game-board/gameboard.connected';
import TouchBackend from 'react-dnd-touch-backend';
// import backgroundImage from '../../../assets/bg-light-wood.jpg';

export const GameScreen = () => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Screen>
        {/* <div className="game-screen-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}> */}
        <div
          className="game-screen-wrapper"
          style={{ backgroundColor: '#0093E9', backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' }}
        >
          <ConnectedGameBoard />
        </div>
      </Screen>
    </DndProvider>
  );
};
