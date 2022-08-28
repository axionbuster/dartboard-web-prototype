import { gameState } from './model'

// wrapInc1(0) = 1
// wrapInc1(1) = 0
function alternate(n) {
  return (n + 1) % 2
}

// Select a player with a higher index, wrapping around as needed.
// Currently, there are only two players, #0 and #1.
export function switchPlayers() {
  // Do some extra work to the old player (current player), and then move on.
  const player = gameState.players[gameState.player]

  if (player.score === 0) {
    // We don't do anything to winners.
    gameState.player = alternate(gameState.player)
    return
  }

  // Old player replenish darts
  player.darts = 3

  // Old player reset score if busted
  if (player.score < 0) {
    player.score = player.stable_score
  }

  gameState.player = alternate(gameState.player)
}

// Throw the dart on a given location for the current player (see gameState)
export function throwDart(index, multiplier) {
  // If the darts count is insufficient, then stop and log the output
  // Throw a new exception (using a string)

  const player = gameState.players[gameState.player]

  if (player.score === 0) {
    return
  }

  if (player.darts < 1) {
    throw 'insufficient darts: player.darts = ' + player.darts
  }

  // Use up a dart
  player.darts -= 1

  // Apply the score
  player.score -= index * multiplier

  // If the player is busted, reset and say "busted."
  // Normally it would trigger the "busted" event and show a dialog.
  // But right now, just log it out to console.
  if (player.score < 0) {
    const willThrow = 'player\'s been busted: score = ' + player.score
    player.score = player.stable_score
    player.darts = 0
    throw willThrow
  }

  // Commit the score
  player.stable_score = player.score

  // If the player has won, generate the event.
  // But for now, just log it out to console.
  if (player.score === 0) {
    throw 'player has won'
  }
}