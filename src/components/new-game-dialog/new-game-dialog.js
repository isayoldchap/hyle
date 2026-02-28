import React from 'react';
import PropType from 'prop-types';
import './new-game-dialog.css';

const BOARD_SIZES = [
  { value: 3, label: '3×3', sublabel: 'Small' },
  { value: 5, label: '5×5', sublabel: 'Medium' },
  { value: 7, label: '7×7', sublabel: 'Large' },
  { value: 9, label: '9×9', sublabel: 'XL' }
];

class NewGameDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
    this.toggleGridLines = this.toggleGridLines.bind(this);
    this.toggleLiveScore = this.toggleLiveScore.bind(this);
    this.togglePlayAgainstAI = this.togglePlayAgainstAI.bind(this);

    const { initialValues = {} } = props;
    this.state = {
      showLiveScore: initialValues.showLiveScore !== undefined ? initialValues.showLiveScore : true,
      showGridLines: initialValues.showGridLines !== undefined ? initialValues.showGridLines : true,
      boardSize: initialValues.boardSize || 5,
      playAgainstAI: !!initialValues.playAgainstAI
    };
  }

  handleOk() {
    const { startAction } = this.props;
    startAction(this.state);
  }

  toggleLiveScore() {
    this.setState(s => ({ showLiveScore: !s.showLiveScore }));
  }

  toggleGridLines() {
    this.setState(s => ({ showGridLines: !s.showGridLines }));
  }

  togglePlayAgainstAI() {
    this.setState(s => ({ playAgainstAI: !s.playAgainstAI }));
  }

  renderToggle(label, checked, onToggle) {
    return (
      <div className="ng-toggle-row" onClick={onToggle}>
        <span className="ng-toggle-row-label">{label}</span>
        <span className={`ng-toggle${checked ? ' ng-toggle--on' : ''}`}>
          <span className="ng-toggle-thumb" />
        </span>
      </div>
    );
  }

  render() {
    const { closeAction, open } = this.props;
    const { showLiveScore, showGridLines, boardSize, playAgainstAI } = this.state;

    if (!open) return null;

    return (
      <div className="ng-overlay">
        <div className="ng-panel">
          <h2 className="ng-title">New Game</h2>

          <div className="ng-section">
            <div className="ng-section-label">Board Size</div>
            <div className="ng-size-group">
              {BOARD_SIZES.map(({ value, label, sublabel }) => (
                <button
                  key={value}
                  type="button"
                  className={`ng-size-btn${boardSize === value ? ' ng-size-btn--active' : ''}`}
                  onClick={() => this.setState({ boardSize: value })}
                >
                  <span className="ng-size-btn__main">{label}</span>
                  <span className="ng-size-btn__sub">{sublabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ng-divider" />

          <div className="ng-section">
            {this.renderToggle('Show Live Score', showLiveScore, this.toggleLiveScore)}
            {this.renderToggle('Show Grid Lines', showGridLines, this.toggleGridLines)}
            {this.renderToggle('Play Against AI', playAgainstAI, this.togglePlayAgainstAI)}
          </div>

          <div className="ng-footer">
            <button type="button" className="btn" onClick={closeAction}>
              Cancel
            </button>
            <button type="button" className="btn ng-btn-start" onClick={this.handleOk}>
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NewGameDialog.propTypes = {
  closeAction: PropType.func.isRequired,
  open: PropType.bool.isRequired,
  startAction: PropType.func.isRequired,
  initialValues: PropType.shape({
    showLiveScore: PropType.bool,
    showGridLines: PropType.bool,
    boardSize: PropType.number,
    playAgainstAI: PropType.bool
  })
};

NewGameDialog.defaultProps = {
  initialValues: {}
};

export default NewGameDialog;
