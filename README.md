# Entropy

A two-player abstract strategy game of order versus chaos, playable in the browser. One player tries to create patterns; the other tries to prevent them.

---

## The Game

Entropy is played on a square grid (5×5 by default). There are five colours of pieces, with enough of each colour to fill the board. The pieces are placed in a random sequence that is visible to both players before the game begins.

The game is played over **two rounds**. In Round 1, Player 1 is **Chaos** and Player 2 is **Order**. The roles are swapped for Round 2. The player with the higher combined score across both rounds wins.

---

## Roles

### Chaos

On each turn, Chaos must place the next piece from the sequence onto any empty cell on the board. Chaos plays first on every move and cannot pass. The goal of Chaos is to scatter pieces as randomly as possible to keep the board score low.

### Order

After Chaos places a piece, Order may slide **one piece** orthogonally (horizontally or vertically) to any empty cell in the same row or column, as long as no other piece blocks the path. Order may also **pass** instead of moving. The goal of Order is to arrange pieces into palindromic sequences to maximise the score.

---

## Scoring

The score is calculated by examining every row and column on the board. Within each line, the contiguous filled segment (ignoring leading and trailing empty cells) is scored. Any empty cell in the **middle** of a filled segment breaks it — the cells on either side of the gap are scored independently.

A segment scores points for **every palindromic substring** it contains, with each palindrome worth a number of points equal to its length.

### How palindromes stack

Because every palindromic substring is scored, longer uniform runs are especially valuable:

| Sequence | Palindromes found | Score |
|---|---|---|
| `RR` | RR (×1) | **2** |
| `GGG` | GGG + GG + GG | **7** |
| `GGGG` | GGGG + GGG + GG + GGG + GG + GG | **14** |
| `RGGR` | RGGR + GG | **6** |
| `BRGGRB` | BRGGRB + RGGR + GG | **12** |

A run of identical pieces in a row or column is the most efficient way to score. Three of the same colour in a line scores 7 — the same as winning an entire row of two-letter palindromes. Four in a line scores 14.

### Gaps matter

Only contiguous filled cells are scored together. An empty cell in the middle of a row breaks the sequence. For example, if a row contains `RR _ RR` (two pairs separated by a gap), each pair scores independently for a total of 4, rather than the 6 that `RRRR` would score.

### End of round

The round ends when all pieces have been placed. The score shown throughout the game is the **cumulative palindrome score** for the current board state. At the end of Round 2, the player with the higher total score across both rounds wins.

---

## Controls

**Chaos** — drag the displayed piece onto any empty cell on the board.

**Order** — drag any piece on the board to a new position in the same row or column, or click **Pass** to skip your move.

Either player may click **Resign** at any time to immediately concede the game.

---

## Strategy Tips

**For Chaos**
- Spread pieces of the same colour as far apart as possible.
- Try to place pieces adjacent to existing ones of a *different* colour to break up potential palindromes.
- Pay attention to which colour is coming next in the sequence — sometimes a piece is so dangerous that it is worth placing it in a corner where Order cannot use it.

**For Order**
- Three or more pieces of the same colour in a line are worth significantly more than two separate pairs — always look for ways to consolidate.
- Forcing moves are powerful: sliding a piece to a position that compels Chaos to complete your palindrome on the next turn is often worth more than an immediate score.
- Empty cells at the edges of a line are more valuable than empty cells in the middle, because they extend potential palindromes rather than breaking them.

---

## Development

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm start
```

The game will be available at `http://localhost:8080`.

**Run tests**

```bash
npm test
```

**Build**

```bash
npm run build
```
