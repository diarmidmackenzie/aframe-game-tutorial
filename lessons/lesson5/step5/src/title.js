// Functions used in game title page
function start() {

  const startButton = document.getElementById("start")
  startButton.style.display = "none"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", false)

  const gameArea = document.getElementById("gameArea")
  gameArea.play()
  gameArea.setAttribute("visible", true)

  initializeGameState()
  setActiveCamera("game-camera")

  addEventListener("game-over", gameOver)
}

function gameOver() {

  const gameArea = document.getElementById("gameArea")
  gameArea.pause()

  const gameOverButton = document.getElementById("game-over")
  gameOverButton.style.display = "block"

  removeEventListener("game-over", gameOver)
}

function reset() {
  const startButton = document.getElementById("start")
  startButton.style.display = "block"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", true)

  const gameArea = document.getElementById("gameArea")
  gameArea.setAttribute("visible", false)

  const gameOverButton = document.getElementById("game-over")
  gameOverButton.style.display = "none"



  setActiveCamera("title-camera")
}

function setActiveCamera(id) {
  const cameras = document.querySelectorAll("[camera]")
  cameras.forEach((c) => {
    if (c.id === id) {
      c.setAttribute("camera", "active", true)
    }
    else {
      c.setAttribute("camera", "active", false)
    }
  })
}

function initializeGameState() {

  const player = document.getElementById("player")
  player.object3D.position.set(0, 0, 0)

  const cameraFocus = document.getElementById("camera-focus")
  cameraFocus.object3D.position.set(0, 0, 0)

  const scoreBoardControls = document.getElementById("scoreboard-controls")
  scoreBoardControls.removeAttribute("track-score")
  scoreBoardControls.setAttribute("track-score", 
                                  "player:#player;display:#score")
}