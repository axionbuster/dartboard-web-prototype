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
  // Designate the active player on top
  const playerToggles = document.querySelectorAll("#player-nav *")
  playerToggles[0].classList.remove("player-active")
  playerToggles[1].classList.remove("player-active")
  playerToggles[gameState.player].classList.add("player-active")

  // Apply player's model
  const player = gameState.players[gameState.player]
  document.getElementById("score").innerText = player.score

  // Those are the rocket symbols 🚀
  // FYI, elements that are <span> but NOT .rocket
  // are &nbsp; that prevent layout shifting when the
  // rocket symbols 🚀 disappear.
  // Set the number of rocket symbols 🚀 equal to
  // the number of darts for that player.
  const rockets = document.querySelectorAll('#darts-parent span.rocket')
  for (const rocket of rockets) {
    rocket.classList.remove('rocket-show')
  }
  for (let i = 0; i < player.darts; i++) {
    rockets[i].classList.add('rocket-show')
  }
}

// Reset and refresh the entire game
export function resetModel() {
  gameState = copyOriginalGameState()

  // This call is apparently not necessary, but
  // it can't hurt.
  applyModel()
}
