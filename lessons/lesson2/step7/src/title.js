// Functions used in game title page

function start() {

  const startButton = document.getElementById("start")
  startButton.style.display = "none"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", false)

  const gameArea = document.getElementById("gameArea")
  gameArea.setAttribute("visible", true)

  setActiveCamera("game-camera")

  addEventListener("game-over", gameOver)
}

function gameOver() {
  const startButton = document.getElementById("start")
  startButton.style.display = "block"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", true)

  const gameArea = document.getElementById("gameArea")
  gameArea.setAttribute("visible", false)

  setActiveCamera("title-camera")

  removeEventListener("game-over", gameOver)
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