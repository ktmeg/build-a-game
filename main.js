class Game {
  constructor () {
    const canvas = document.querySelector('#run')
    const screen = canvas.getContext('2d')
    const gameSize = { x: canvas.width, y: canvas.height }
    this.player = new Player(this, gameSize)

    console.log(this.player)

    const tick = () => {
      this.update()
      this.draw(screen, gameSize)
      requestAnimationFrame(tick)
    }
    tick()
  }

  update () {
    this.player.update()
    console.log('update')
  }

  draw (screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y)
    drawRect(screen, this.player)
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
  
  update () {
    if (this.keyboarder.isDown(this.keyboarder.keyState.LEFT)) {
      this.center.x -= 2
    } else if (this.keyboarder.isDown((this.keyboarder.keyState.RIGHT))) {
      this.center.x += 2
    }
  }
}

function drawRect (screen, body) {
  screen.fillRect(body.center.x - body.size.x / 2, body.center.y / 2, body.size.x, body.size.y)
}
window.addEventListener('load', function () {
  new Game()
})