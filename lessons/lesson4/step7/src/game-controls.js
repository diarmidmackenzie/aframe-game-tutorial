AFRAME.registerComponent('game-controls', {

  init() {

    this.stepForwards = this.stepForwards.bind(this)
    this.keyDown = this.keyDown.bind(this)
    window.addEventListener("click", this.stepForwards)
    window.addEventListener("keydown", this.keyDown)
  },

  stepForwards() {
    this.el.object3D.position.x += 1
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
    speed: { type: 'number', default: 1 }
  },

  tick(t, dt) {    
    const increment = dt / 1000 * this.data.speed
    this.el.object3D.position.x += increment
  }
})

AFRAME.registerComponent('pacer-limits', {
  schema: {
    player: { type: 'selector', default: "#player" }
  },

  tick() {    
    if (this.el.object3D.position.x - this.data.player.object3D.position.x > 20) {
      this.el.emit("game-over")
    }
  }
})

