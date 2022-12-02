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

    const vehicle = document.createElement('a-entity')
    vehicle.setAttribute("id", `${this.el.id}-vehicle-${index}`)
    vehicle.setAttribute("instanced-mesh-member", "mesh:#car-instanced-mesh")
    vehicle.setAttribute("z-movement", {speed: this.data.speed,
                                        loopLower: -roadLength/2,
                                        loopUpper: roadLength/2})
    vehicle.object3D.rotation.set(0, this.data.speed < 0 ? Math.PI : 0, 0)
    vehicle.object3D.position.set(0, 0.5, zPosition)
    vehicle.object3D.scale.set(0.5, 0.5, 0.5)
    this.el.appendChild(vehicle)

    const collider = document.createElement('a-box')
    collider.setAttribute("id", `${this.el.id}-vehicle-${index}-collider`)
    collider.setAttribute("depth", 4)
    collider.setAttribute("height", 2)
    collider.setAttribute("width", 2)
    collider.setAttribute("material", "wireframe: true")
    collider.setAttribute("visible", false)
    collider.setAttribute("collision-check", "target: #player-collider")
    vehicle.appendChild(collider)

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
    this.thisBox.expandByScalar(-0.001)

    if (this.thisBox.intersectsBox(this.targetBox)) {
      this.el.emit("game-over")
    }
  }
})


AFRAME.registerComponent('landscape', {

  schema: {
    numRoads: { type : 'number', default: 50},
    initialSpace: { type : 'number', default: 5},
    interval: { type : 'number', default: 3},
  },

  init() {
    this.roads = []

    for (var ii = 0; ii < this.data.numRoads; ii++) {
      const road = this.createRoad(ii)
      this.roads.push(road)
    }
  },

  createRoad(index) {
    const speed = this.getRoadSpeed(index)
    const xPosition = this.getRoadPosition(index)

    const road = document.createElement('a-box')
    road.setAttribute("id", `road-${index}`)
    road.setAttribute("color", "black")
    road.setAttribute("depth", 500)
    road.setAttribute("width", 1)
    road.setAttribute("road", {numVehicles: 10,
                               speed: speed})
    road.object3D.position.set(xPosition, -0.99, 0)

    this.el.appendChild(road)

    return road
  },

  getRoadSpeed(index) {
    const speed = Math.sign(Math.random() - 0.5) * (10 + index + 10 * Math.random())
    return speed
  },

  getRoadPosition(index) {
    const position = this.data.initialSpace + 
                     (index * this.data.interval) + 
                     Math.floor(Math.random() * this.data.interval)
    return position
  }
})