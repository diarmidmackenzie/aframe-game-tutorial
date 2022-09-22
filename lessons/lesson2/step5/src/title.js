// Functions used in game title page

function start() {

  const startButton = document.getElementById("start")
  startButton.style.display = "none"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", false)

  const gameArea = document.getElementById("gameArea")
  gameArea.setAttribute("visible", true)

  setActiveCamera("game-camera")

  setTimeout(() => {
    alert("Starting Game")
  }, 100)

  setTimeout(gameOver, 3000)
}

function gameOver() {
  const startButton = document.getElementById("start")
  startButton.style.display = "block"

  const gameTitle = document.getElementById("gameTitle")
  gameTitle.setAttribute("visible", true)

  const gameArea = document.getElementById("gameArea")
  gameArea.setAttribute("visible", false)

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