import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../lobby/lobby.css';
import { GameScreen } from '../game-screen/game-screen';

export const GameRoomPage = ({ myRole, waitingForOpponent, joinCode, joinGame }) => {
  const { code } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [copied, setCopied] = useState(false);

  const gameCode = joinCode || code;
  const shareUrl = `${window.location.origin}/games/${gameCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleJoin = () => {
    const name = playerName.trim() || 'Player 2';
    joinGame(code, name);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleJoin();
  };

  // ── Active game ────────────────────────────────────────────────────────────
  if (myRole && !waitingForOpponent) {
    return <GameScreen />;
  }

  // ── Creator waiting for opponent ───────────────────────────────────────────
  if (waitingForOpponent) {
    return (
      <div className="lobby-page">
        <div className="lobby-card">
          <div className="lobby-waiting">
            <p className="lobby-waiting-title">Waiting for opponent…</p>

            <div className="lobby-label">Share this link</div>
            <div className="lobby-share-row">
              <div className="lobby-share-url">{shareUrl}</div>
              <button
                type="button"
                className={`lobby-btn lobby-btn--copy${copied ? ' lobby-btn--copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="lobby-label" style={{ marginTop: '1rem' }}>Or share the code</div>
            <div className="lobby-code-display">{gameCode}</div>

            <div className="lobby-spinner">
              <span className="lobby-spinner-dot" />
              <span className="lobby-spinner-dot" />
              <span className="lobby-spinner-dot" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Joiner arriving via shared link ───────────────────────────────────────
  return (
    <div className="lobby-page">
      <div className="lobby-card">
        <h1 className="lobby-title">Entropy</h1>
        <p className="lobby-invite-hint">You&apos;ve been invited to play</p>

        <div className="lobby-label">Your Name</div>
        <input
          className="lobby-name-input"
          type="text"
          placeholder="Player 2"
          maxLength={24}
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <button
          type="button"
          className="lobby-btn lobby-btn--primary"
          style={{ width: '100%' }}
          onClick={handleJoin}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

GameRoomPage.propTypes = {
  myRole: PropTypes.string,
  waitingForOpponent: PropTypes.bool,
  joinCode: PropTypes.string,
  joinGame: PropTypes.func.isRequired,
};

GameRoomPage.defaultProps = {
  myRole: null,
  waitingForOpponent: false,
  joinCode: null,
};
