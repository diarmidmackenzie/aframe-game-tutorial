AFRAME.registerComponent('game-controls', {

  init() {

    this.stepForwards = this.stepForwards.bind(this)
    this.keyDown = this.keyDown.bind(this)
    window.addEventListener("click", this.stepForwards)
    window.addEventListener("keydown", this.keyDown)
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
  }

})