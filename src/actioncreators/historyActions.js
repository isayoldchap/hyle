export const HistoryActionTypes = Object.freeze({
  BACK: 'back'
});

export const createBackAction = () => ({
  type: HistoryActionTypes.BACK
});
