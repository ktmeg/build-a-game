class Game {
  constructor() {
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

  update() {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update()
    }
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    for (let i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i])
    }
  }

  addBody(body) {
    this.bodies.push(body)
  }
}

class Player {
  constructor (game, gameSize) {
    this.game = game
    this.size = { x: 12, y: 12 }
    this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }
    // this.center = { x: 50, y: 50 }
    this.keyboarder = Keyboarder
  }

  update() {
    console.log(this.keyboarder.keyState)
    // console.log('left', this.keyboarder.KEYS.LEFT)
    // console.log('right', this.keyboarder.KEYS.RIGHT)
    // console.log('up', this.keyboarder.KEYS.UP)
    if (this.center.x > 0) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 2
      }
    }
    if (this.center.x < 400) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
        this.center.x += 2
      }
    }
    if (this.center.y > 0) {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
        this.center.y -= 2
      }
    }
    if (this.center.y < 780) {
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
    this.speedX = 0.2
    // this.patrol = 0
  }
  update() {
    this.center.x += this.speedX
    this.moveX += this.speedX
    // if (this.patrolX < 0 || this.patrolX > 30) {
    //   this.speedX = -this.speedX
    }
  }

function spawn(game) {
  const enemies = []
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 400
    const y = Math.random() * 400
    enemies.push(new Enemy(game, { x: x, y: y }))
  }
  return enemies
}

function drawRect(screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y / 2, body.size.x, body.size.y); 
  // screen.fillStyle = "pink"
}

// function colliding(b1, b2) {
//   return !(
//     b1 === b2 ||
//     b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
//         b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
//         b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
//         b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
//   )
// }

window.addEventListener('load', function () {
  new Game()
})
