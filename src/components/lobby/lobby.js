import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import NewGameDialog from '../new-game-dialog/new-game-dialog';
import './lobby.css';

export const Lobby = ({ myRole, waitingForOpponent, joinCode, lobbyGames, createGame, joinGame, refreshGames }) => {
  const history = useHistory();
  const [playerName, setPlayerName] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // For AI games, GAME_STARTED arrives immediately — go straight to the board.
  useEffect(() => {
    if (myRole && !waitingForOpponent) {
      history.push('/game');
    }
  }, [myRole, waitingForOpponent, history]);

  // For H vs H, navigate to the game room URL so the creator can share it.
  useEffect(() => {
    if (waitingForOpponent && joinCode) {
      history.push(`/games/${joinCode}`);
    }
  }, [waitingForOpponent, joinCode, history]);

  // Refresh open games on mount and every 5 s.
  useEffect(() => {
    refreshGames();
    const interval = setInterval(refreshGames, 5000);
    return () => clearInterval(interval);
  }, [refreshGames]);

  const effectiveName = playerName.trim() || 'Player 1';

  const handleCreateGame = (options) => {
    setDialogOpen(false);
    createGame({ ...options, player1Name: effectiveName });
  };

  const handleJoinGame = () => {
    const code = joinCodeInput.trim().toUpperCase();
    if (!code) return;
    joinGame(code, effectiveName);
  };

  const handleJoinOpen = (code) => {
    joinGame(code, effectiveName);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleJoinGame();
  };

  // ── Main lobby view ────────────────────────────────────────────────────────
  return (
    <div className="lobby-page">
      <div className="lobby-card">
        <h1 className="lobby-title">Entropy</h1>

        <div className="lobby-label">Your Name</div>
        <input
          className="lobby-name-input"
          type="text"
          placeholder="Player 1"
          maxLength={24}
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />

        <div className="lobby-actions">
          <button
            type="button"
            className="lobby-btn lobby-btn--primary"
            onClick={() => setDialogOpen(true)}
          >
            New Game
          </button>
        </div>

        <div className="lobby-divider" />

        <div className="lobby-label">Join by Code</div>
        <div className="lobby-join-row">
          <input
            className="lobby-code-input"
            type="text"
            placeholder="Enter join code"
            maxLength={6}
            value={joinCodeInput}
            onChange={e => setJoinCodeInput(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="lobby-btn"
            style={{ flex: '0 0 auto', padding: '0 1rem' }}
            onClick={handleJoinGame}
          >
            Join
          </button>
        </div>

        {lobbyGames.length > 0 && (
          <>
            <div className="lobby-divider" />
            <div className="lobby-label">Open Games</div>
            <ul className="lobby-open-games">
              {lobbyGames.map(game => (
                <li key={game.gameId} className="lobby-open-game-row">
                  <div className="lobby-open-game-info">
                    <span className="lobby-open-game-name">{game.creatorName}</span>
                    <span className="lobby-open-game-meta">{game.boardSize}×{game.boardSize} · {game.joinCode}</span>
                  </div>
                  <button
                    type="button"
                    className="lobby-btn"
                    style={{ flex: '0 0 auto', padding: '0.4rem 0.9rem', fontSize: '0.7rem' }}
                    onClick={() => handleJoinOpen(game.joinCode)}
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {lobbyGames.length === 0 && (
          <>
            <div className="lobby-divider" />
            <p className="lobby-empty">No open games right now — create one!</p>
          </>
        )}
      </div>

      <NewGameDialog
        open={dialogOpen}
        startAction={handleCreateGame}
        closeAction={() => setDialogOpen(false)}
      />
    </div>
  );
};

Lobby.propTypes = {
  myRole: PropTypes.string,
  waitingForOpponent: PropTypes.bool,
  joinCode: PropTypes.string,
  lobbyGames: PropTypes.arrayOf(PropTypes.shape({
    gameId: PropTypes.string,
    joinCode: PropTypes.string,
    creatorName: PropTypes.string,
    boardSize: PropTypes.number,
  })),
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  refreshGames: PropTypes.func.isRequired,
};

Lobby.defaultProps = {
  myRole: null,
  waitingForOpponent: false,
  joinCode: null,
  lobbyGames: [],
};
