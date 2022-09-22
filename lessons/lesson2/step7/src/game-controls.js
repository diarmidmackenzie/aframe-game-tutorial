AFRAME.registerComponent('game-controls', {

  init() {

    this.stepForwards = this.stepForwards.bind(this)
    window.addEventListener("click", this.stepForwards)
  },

  stepForwards() {
    this.el.object3D.position.x += 1

    if (this.el.object3D.position.x > 30) {
      this.el.emit("game-over")
    }
  }
})