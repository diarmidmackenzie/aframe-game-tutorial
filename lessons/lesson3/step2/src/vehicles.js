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
    vehicle.setAttribute("linear-movement", {x: 0, y: 0, z: this.data.speed})
    vehicle.object3D.position.set(0, 0.5, zPosition)
    this.el.appendChild(vehicle)

    return vehicle
  },

  roadLength() {
    return this.el.getAttribute("depth")
  }
})

AFRAME.registerComponent('linear-movement', {

  schema: {
    type: 'vec3', default: {x: 0, y: 0, z: 0}
  },

  init() {
    this.deltaVec = new THREE.Vector3()
  },

  tick(time, timeDelta) {

    this.deltaVec.copy(this.data)
    this.deltaVec.multiplyScalar(timeDelta / 1000)
    this.el.object3D.position.add(this.deltaVec)
  }
})