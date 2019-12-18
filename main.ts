function collision () {
    head = snake[0]
    for (let index = 0; index <= snake.length - 2; index++) {
        cur_sprite = snake[snake.length - index - 1]
        if (cur_sprite.isTouching(head)) {
            game.gameOver()
        }
    }
}
function move_snake () {
    for (let index = 0; index <= snake.length - 2; index++) {
        cur_sprite = snake[snake.length - index - 1]
        prev_sprite = snake[snake.length - index - 2]
        cur_sprite.set(LedSpriteProperty.X, prev_sprite.get(LedSpriteProperty.X))
        cur_sprite.set(LedSpriteProperty.Y, prev_sprite.get(LedSpriteProperty.Y))
    }
    snake[0].move(1)
    if (0 < tail.length) {
        snake.push(tail.pop())
    }
}
input.onButtonPressed(Button.B, function () {
    snake[0].turn(Direction.Right, 90)
})
function eat_food () {
    new_tail = game.createSprite(2, 2)
    new_tail.set(LedSpriteProperty.Brightness, 5)
    tail.insertAt(0, new_tail)
    food.set(LedSpriteProperty.X, Math.randomRange(0, 4))
    food.set(LedSpriteProperty.Y, Math.randomRange(0, 4))
    game.addScore(1)
}
input.onButtonPressed(Button.A, function () {
    snake[0].turn(Direction.Left, 90)
})
let new_tail: game.LedSprite = null
let prev_sprite: game.LedSprite = null
let cur_sprite: game.LedSprite = null
let head: game.LedSprite = null
let food: game.LedSprite = null
let tail: game.LedSprite[] = []
let snake: game.LedSprite[] = []
snake = [game.createSprite(2, 2)]
tail = []
food = game.createSprite(Math.randomRange(0, 4), Math.randomRange(0, 4))
food.set(LedSpriteProperty.Blink, 1)
food.set(LedSpriteProperty.Brightness, 3)
basic.forever(function () {
    move_snake()
    basic.pause(500)
})
basic.forever(function () {
    if (food.isTouching(snake[0])) {
        eat_food()
    }
    collision()
})
