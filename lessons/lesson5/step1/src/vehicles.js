AFRAME.registerComponent('road', {

  schema: {
    numVehicles: { type : 'number', default: 10},
    length:  { type : 'number', default: 500},
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
    vehicle.setAttribute("depth", 2)
    vehicle.setAttribute("id", `${this.el.id}-vehicle-${index}`)
    vehicle.setAttribute("color", "blue")
    
    vehicle.setAttribute("z-movement", {speed: this.data.speed,
                                        loopLower: -roadLength/2,
                                        loopUpper: roadLength/2})
    vehicle.setAttribute("collision-check", "target: #player")
    vehicle.object3D.position.set(0, 0.5, zPosition)
    this.el.appendChild(vehicle)

    const vehicleModel = document.createElement('a-entity')
    vehicleModel.setAttribute("gltf-model", "#car-model")
    vehicleModel.setAttribute("position", "-0.9 0 0")
    if (this.data.speed > 0) {
      vehicleModel.setAttribute("scale", "0.5 0.5 0.5")
    }
    else {
      vehicleModel.setAttribute("scale", "0.5 0.5 -0.5")
    }
    vehicle.appendChild(vehicleModel)

    return vehicle
  },

  roadLength() {
    return this.data.length
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

    const road = document.createElement('a-entity')
    road.setAttribute("id", `road-${index}`)
    road.setAttribute("width", 1)
    road.setAttribute("road", {numVehicles: 10,
                               length: 500,
                               speed: speed})
    road.object3D.position.set(xPosition, -0.99, 0)
    this.el.appendChild(road)

    const roadSurface = document.createElement('a-plane')
    roadSurface.setAttribute("color", "black")
    roadSurface.setAttribute("height", 500)
    roadSurface.setAttribute("width", 1)
    roadSurface.setAttribute("rotation", "-90 0 0")
    road.object3D.position.set(xPosition, -0.5, 0)
    road.appendChild(roadSurface)

    return road
  },

  getRoadSpeed(index) {
    const speed = Math.sign(Math.random() - 0.5) * (10 + index + Math.random(10))
    return speed
  },

  getRoadPosition(index) {
    const position = this.data.initialSpace + 
                     (index * this.data.interval) + 
                     Math.floor(Math.random() * this.data.interval)
    return position
  }
})