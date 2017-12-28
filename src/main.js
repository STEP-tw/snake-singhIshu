let snake = undefined;
let food = undefined;
let numberOfRows = 60;
let numberOfCols = 120;

let animator = undefined;

const animateSnake = function() {
  let oldHead = snake.getHead();
  let oldTail = snake.move();
  let head = snake.getHead();
  let body = snake.getBody();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  endGame(head, body);
  if (head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows, numberOfCols);
    drawFood(food);
  }
}

const isNorthOrWestEdge = function(coordX, coordY) {
  return coordX < 0 || coordY < 0;
}

const isSouthOrEastEdge = function(coordX, coordY) {
  return coordX > numberOfCols || coordY > numberOfRows;
}

const hasHitTheEdge = function(head) {
  let coordX = head.getCoord()[0];
  let coordY = head.getCoord()[1];
  return isSouthOrEastEdge(coordX,coordY) || isNorthOrWestEdge(coordX,coordY);
}

const displayResult = function() {
  let result = document.getElementById("gameOver");
  let playAgainLink = document.getElementById("playAgain");
  result.innerHTML = "Game Over";
  playAgainLink.innerHTML = "Click here to Play Again";
}

const isGameOver = function(head) {
  return hasHitTheEdge(head) || snake.hasEatenItself();
}

const endGame = function(head) {
  if (isGameOver(head)) {
    clearInterval(animator);
    displayResult();
  }
  return;
}

const changeSnakeDirection = function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener = function() {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function() {
  let tail = new Position(12, 10, "east");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();

  snake = new Snake(head, body);
}

const createFood = function(numberOfRows, numberOfCols) {
  food = generateRandomPosition(numberOfCols, numberOfRows);
}

const startGame = function() {
  createSnake();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows, numberOfCols);
  drawFood(food);
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

window.onload = startGame;
