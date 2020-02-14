class Game {
  constructor () {
    const canvas = document.querySelector('#run')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.bodies = []
    this.bodies = this.bodies.concat(spawn(this))
    this.bodies = this.bodies.concat(new Player(this, gameSize))

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
      // does this need to go to bottom of the function?? does that matter?
    }
    for (let i = 0; i < this.bodies.length; i++) {
      if (
        this.bodies[i].center.y > 1000 ||
        this.bodies[i].center.x > 550 ||
        this.bodies[i].center.y < 0 ||
        this.bodies[i].center.x < 0
      ) {
        this.bodies.splice(i, 1)
        this.bodies.push(
          new Enemy(this, { x: Math.random() * 600, y: Math.random() * 600 })
        )
      }
    }
    const notColliding = (b1) => {
      return this.bodies.filter(function (b2) { return colliding(b1, b2) }).length === 0
    }
    return this.bodies.filter(notColliding)
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  addBody (body) {
    this.bodies.push(body)
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 20, y: 20 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    this.keyboarder = Keyboarder
  }

  update () {
    console.log(this.keyboarder.keyState)
    if (this.center.x > 30) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 2
      }
    }
    if (this.center.x < 525) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 2
      }
    }
    if (this.center.y > 30) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 2
      }
    }
    if (this.center.y < 1000) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
        this.center.y += 2
      }
    }
  }
}

class Enemy {
  constructor (game, center) {
    this.game = game
    this.center = center
    this.size = { x: 10, y: 10 }
    this.moveX = 0
    this.speedX = Math.random() * 4 - 1
    this.moveY = 0
    this.speedY = Math.random() * 4 - 1
  }
  update () {
    this.center.x += this.speedX
    this.moveX += this.speedX
    this.center.y += this.speedY
    this.moveY += this.speedY
    if (this.moveX < 0 || this.moveX > 400) {
      this.speedX = -this.speedX
    }
    if (this.moveY < 0 || this.moveY > 400) {
      this.speedY = -this.speedY
    }
  }
}

function spawn (game) {
  const enemies = []
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 600
    const y = Math.random() * 1280
    // why is y double the size?
    enemies.push(new Enemy(game, { x: x, y: y }))
  }
  return enemies
}

function drawRect (screen, body) {
  screen.fillRect(
    body.center.x - body.size.x / 2,
    body.center.y / 2,
    body.size.x,
    body.size.y
  )
  screen.fillStyle = '#F1FFE7'
}

function colliding (b1, b2) {
  return !(
    b1 === b2 ||
    b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
  )
}
//colliding fuction not registering -- added return to update function in Game class

window.addEventListener('load', function () {
  new Game()
})
