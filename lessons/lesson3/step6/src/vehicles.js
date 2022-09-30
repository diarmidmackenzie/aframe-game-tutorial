AFRAME.registerComponent('road', {

  schema: {
    numVehicles: { type : 'number', default: 10},
    speed: {type: 'number', default: 3},
  },

  init() {
    this.vehicles = []

    for (var ii = 0; ii < this.data.numVehicles; ii++) {
      const vehicle = this.createVehicle(ii)
      this.vehicles.push(vehicle)
    }
  },

  createVehicle(index) {
    const roadLength = this.roadLength()
    zPosition = (Math.random() * roadLength) - (roadLength / 2)

    const vehicle = document.createElement('a-box')
    vehicle.setAttribute("depth", 2)
    vehicle.setAttribute("id", `${this.el.id}-vehicle-${index}`)
    vehicle.setAttribute("color", "blue")
    vehicle.setAttribute("z-movement", {speed: this.data.speed,
                                        loopLower: -roadLength/2,
                                        loopUpper: roadLength/2})
    vehicle.setAttribute("collision-check", "target: #player")
    vehicle.object3D.position.set(0, 0.5, zPosition)
    this.el.appendChild(vehicle)

    return vehicle
  },

  roadLength() {
    return this.el.getAttribute("depth")
  }
})

AFRAME.registerComponent('z-movement', {

  schema: {
    speed: {type: 'number', default: 3},
    loopLower: {type: 'number', default: -100},
    loopUpper: {type: 'number', default: 100},
  },


  tick(time, timeDelta) {

    const delta = this.data.speed * timeDelta / 1000
    this.el.object3D.position.z += delta

    const loopLength = this.data.loopUpper - this.data.loopLower

    if (this.el.object3D.position.z > this.data.loopUpper) {
      this.el.object3D.position.z -= loopLength
    }

    if (this.el.object3D.position.z < this.data.loopLower) {
      this.el.object3D.position.z += loopLength
    }
  }
})

AFRAME.registerComponent('collision-check', {

  schema: {
    target: {type: 'selector', default: '#player'}
  },

  init() {

    this.targetBox = new THREE.Box3()
    this.thisBox = new THREE.Box3()
  },

  tick() {

    this.targetBox.setFromObject(this.data.target.object3D)
    this.thisBox.setFromObject(this.el.object3D)

    if (this.thisBox.intersectsBox(this.targetBox)) {
      alert(`collision!\n${JSON.stringify(this.targetBox)}\n${JSON.stringify(this.thisBox)}`)
    }
  }
})