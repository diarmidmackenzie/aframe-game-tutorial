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