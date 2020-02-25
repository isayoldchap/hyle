import blueTriangle from '../../../../assets/game-pieces/game-piece-blue-triangle-600.png';
import goldX from '../../../../assets/game-pieces/game-piece-gold-x-600.png';
import greenStar from '../../../../assets/game-pieces/game-piece-green-star-600.png';
import limeSlash from '../../../../assets/game-pieces/game-piece-lime-slash-600.png';
import orangeEquals from '../../../../assets/game-pieces/game-piece-orange-equals-600.png';
import pinkDot from '../../../../assets/game-pieces/game-piece-pink-dot-600.png';
import purplePlus from '../../../../assets/game-pieces/game-piece-purple-plus-600.png';
import redAsterisk from '../../../../assets/game-pieces/game-piece-red-asterisk-600.png';
import violetMinus from '../../../../assets/game-pieces/game-piece-violet-minus-600.png';

export const getGamePieceSrc = color => {
  switch (color) {
    case 'Red':
      return redAsterisk;
    case 'Blue':
      return blueTriangle;
    case 'Orange':
      return orangeEquals;
    case 'Magenta':
      return pinkDot;
    case 'Green':
      return greenStar;
    case 'Cyan':
      return purplePlus;
    case 'Brown':
      return goldX;
    case 'Silver':
      return limeSlash;
    case 'Gray':
      return violetMinus;
    default:
      return null;
  }
};
