// Get a copy of the default game state (as is provided at start-up)
function copyOriginalGameState() {
  return {
    // Who is the player? Make it a simple integer between [0, 1].
    player: 0,

    // The internal states of players.
    players: [
      // Player 1
      {
        // Player's score (active)
        score: 501,

        // Player's score (stable)
        // This is used to roll back the score when it is busted.
        stable_score: 501,

        // Number of darts left for this player when it's its turn
        darts: 3,
      },
      // Player 2
      {
        score: 501,
        stable_score: 501,
        darts: 3,
      }
    ]
  }
}

// Playing a game of 501
export let gameState = copyOriginalGameState()

// Apply the model into the view
export function applyModel() {
  // #player-nav --> class != "player-active"
  // #player-nav .nth-child(gameState.player) --> class="player-active"

  const playerToggles = document.querySelectorAll("#player-nav *")
  playerToggles[0].classList.remove("player-active")
  playerToggles[1].classList.remove("player-active")
  playerToggles[gameState.player].classList.add("player-active")

  const player = gameState.players[gameState.player]

  // Apply player's model
  // Currently, only score (no darts left)
  // #score --> set inner text to player.score
  document.getElementById("score").innerText = player.score
}

// Reset and refresh the entire game
export function resetModel() {
  gameState = copyOriginalGameState()
}