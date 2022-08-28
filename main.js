import './style.css'
import { applyModel, resetModel } from './model'
import { switchPlayers, throwDart } from './debugControl'

// Do this the first thing in the morning
applyModel()

// Any discernible event --> apply the model
// Right now, it's OK to make it manual.

// Bind it to the left and right buttons
// button.switch-player (all) --> on click -->
//  1. switchPlayers()
//  2. applyModel()
const collection = document.getElementsByClassName("switch-player")
for (const button of collection) {
  button.addEventListener('click', function (_event) {
    switchPlayers()
    applyModel()
  })
}

// Bind the throw event to throw-regular button
//  Info 1 (index): text of #debug-throw ---> parse to integer
//  Info 2 (index): text of #debug-multiplier ---> parse to integer
//  Bind event to: #throw-regular button on click
document.getElementById('throw-regular')
  .addEventListener('click', function (_event) {
    throwDart(
      parseInt(document.getElementById('debug-throw').value),
      parseInt(document.getElementById('debug-multiplier').value)
    )
    applyModel()
  })

document.getElementById('throw-be1')
  .addEventListener('click', function (_event) {
    throwDart(25, 1)
    applyModel()
  })

document.getElementById('throw-be2')
  .addEventListener('click', function (_event) {
    throwDart(25, 2)
    applyModel()
  })

document.getElementById('throw-miss')
  .addEventListener('click', function (_event) {
    throwDart(0, 0)
    applyModel()
  })

document.getElementById('refresh-page')
  .addEventListener('click', function (_event) {
    resetModel()
    applyModel()
  })