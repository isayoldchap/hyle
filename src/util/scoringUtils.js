export const scoreCombo = pattern => {
  if (tooSmall(pattern)) return 0;
  return (
    scoreSingle(pattern) +
    scoreRight(dropLast(pattern)) +
    scoreCombo(dropHead(pattern))
  );
};

const scoreRight = pattern => {
  if (tooSmall(pattern)) return 0;
  return scoreSingle(pattern) + scoreRight(dropLast(pattern));
};

const dropHead = pattern => pattern.substring(1);

const dropLast = pattern => pattern.substring(0, pattern.length - 1);

export const scoreSingle = pattern => {
  if (isUnScorable(pattern)) {
    return 0;
  } else if (isPalindrome(pattern)) {
    return pattern.length;
  }
  return 0;
};

const isUnScorable = pattern => hasGaps(pattern) || tooSmall(pattern);

const tooSmall = pattern => pattern.length < 2;

const hasGaps = pattern => pattern.indexOf(' ') !== -1;

const isPalindrome = pattern => pattern === reversePattern(pattern);

const reversePattern = pattern =>
  pattern
    .split('')
    .reverse()
    .join('');
