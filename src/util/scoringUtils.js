const tooSmall = pattern => pattern.length < 2;

const hasGaps = pattern => pattern.indexOf(' ') !== -1;

const isUnScorable = pattern => hasGaps(pattern) || tooSmall(pattern);

const dropHead = pattern => pattern.substring(1);

const dropLast = pattern => pattern.substring(0, pattern.length - 1);

const isPalindrome = pattern => {
  let frontMarker = 0;
  let endMarker = pattern.length - 1;
  while (frontMarker < endMarker) {
    if (pattern[frontMarker] !== pattern[endMarker]) {
      return false;
    }
    frontMarker += 1;
    endMarker -= 1;
  }
  return true;
};

export const scoreSingle = pattern => {
  if (isUnScorable(pattern)) {
    return 0;
  } else if (isPalindrome(pattern)) {
    return pattern.length;
  }
  return 0;
};

const scoreRight = pattern => {
  if (tooSmall(pattern)) return 0;
  return scoreSingle(pattern) + scoreRight(dropLast(pattern));
};

export const scoreCombo = pattern => {
  if (tooSmall(pattern)) return 0;
  return scoreSingle(pattern) + scoreRight(dropLast(pattern)) + scoreCombo(dropHead(pattern));
};
