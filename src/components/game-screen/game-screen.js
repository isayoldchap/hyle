import React from 'react';
import './game-screen.style.css';
import { Screen } from '../screen/screen';
import { DndProvider } from 'react-dnd';
import { ConnectedGameBoard } from '../game-board/gameboard.connected';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { getIsMobile } from '../../util/get-is-mobile/get-is-mobile';

// Use the HTML5 backend on desktop — it binds directly to native browser drag events
// with no artificial delay. The touch backend is kept for mobile/tablet where touch
// events are needed.
const isMobile = getIsMobile();
const dndBackend = isMobile ? TouchBackend : HTML5Backend;
const dndOptions = isMobile ? {} : undefined;

export const GameScreen = () => {
  return (
    <DndProvider backend={dndBackend} options={dndOptions}>
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
