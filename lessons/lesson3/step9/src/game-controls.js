AFRAME.registerComponent('game-controls', {

  init() {

    this.stepForwards = this.stepForwards.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.collision = this.collision.bind(this)
    window.addEventListener("click", this.stepForwards)
    window.addEventListener("keydown", this.keyDown)
    window.addEventListener("collision", this.collision)
  },

  stepForwards() {
    this.el.object3D.position.x += 1

    if (this.el.object3D.position.x > 30) {
      this.el.emit("game-over")
    }
  },

  keyDown(event) {

    if (event.key === " " && !event.repeat) {
      this.stepForwards()
    }
  },

  collision() {
    this.el.emit("game-over")
  }

})