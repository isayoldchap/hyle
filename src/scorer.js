export const scorePattern = (pattern) => {
  if (pattern.length === 0) return 0;
  return scoreSingle(pattern) +
         scoreRight(pattern.substring(0, pattern.length -1)) +
         scorePattern(pattern.substring(1));
}

const scoreRight = (pattern) => {
  if (pattern.length < 2) return 0;
  return scoreSingle(pattern) + scoreRight(pattern.substring(0, pattern.length -1));
}

const scoreSingle = (pattern) => {
  if (pattern.length < 2) {
    return 0;
  }
  if (pattern === reversePattern(pattern)) {
    return pattern.length;
  }
  return 0;
}

const reversePattern = (pattern) => {
  return pattern.split("").reverse().join("");
}
