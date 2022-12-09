AFRAME.registerComponent('game-controls', {

  init() {
    this.stepForwards = this.stepForwards.bind(this)
    this.keyDown = this.keyDown.bind(this)
  },

  play() {
    window.addEventListener("click", this.stepForwards)
    window.addEventListener("keydown", this.keyDown)
  },

  pause() {
    window.removeEventListener("click", this.stepForwards)
    window.removeEventListener("keydown", this.keyDown)
  },

  remove() {
    window.removeEventListener("click", this.stepForwards)
    window.removeEventListener("keydown", this.keyDown)
  },

  stepForwards() {
    this.el.object3D.position.x += 1
    this.el.emit("player-moved")
  },

  keyDown(event) {

    if (event.key === " " && !event.repeat) {
      this.stepForwards()
    }
  }
})

AFRAME.registerComponent('follow-entity', {
  schema: {
    type: 'selector'
  },

  init() {
    this.offsetVector = new THREE.Vector3()
    this.offsetVector.copy(this.el.object3D.position)
    this.offsetVector.sub(this.data.object3D.position)
  },

  tick() {    
    this.el.object3D.position.copy(this.data.object3D.position)
    this.el.object3D.position.add(this.offsetVector)
  }
})

AFRAME.registerComponent('pacer-movement', {
  schema: {
    speed: { type: 'number', default: 1 },
    player: { type: 'selector', default: "#player" }
  },

  tick(t, dt) {

    let speed = this.data.speed
    const amountBehind = this.data.player.object3D.position.x - this.el.object3D.position.x
    if (amountBehind > 5) {
      speed += (amountBehind - 5) / 3
    }

    if (amountBehind < -20) {
      this.el.emit("game-over")
    }

    const increment = dt / 1000 * speed
    this.el.object3D.position.x += increment
  }
})

AFRAME.registerComponent('track-score', {
  schema: {
    player: { type: 'selector', default: "#player" },
    display: { type: 'selector', default: "#score" }
  },

  init() {
    this.score = 0
    this.data.display.innerHTML = this.score

    this.playerMoved = this.playerMoved.bind(this)
    this.data.player.addEventListener("player-moved", this.playerMoved)
  },

  playerMoved() {
    this.score = Math.max(this.data.player.object3D.position.x, this.score)
    this.data.display.innerHTML = this.score
  }
})

AFRAME.registerComponent('pause', {
  init() {
    this.el.pause()
  }
})