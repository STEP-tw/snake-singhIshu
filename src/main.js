let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  endGame(head);
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const isNorthOrWestBrdr = function(coordX,coordY) {
  return coordX < 0 || coordY < 0;
}

const isSouthOrEastBrdr = function(coordX,coordY) {
  return coordX = 120 || coordY = 60 ;
}

const hasTouchedBorder = function(head) {
  let coordX = head.getCoord()[0];
  let coordY = head.getCoord()[1];
  return isSouthOrEastBrdr(coordX,coordY) || isNorthOrWestBrdr(coordX,coordY);
}

const getCoordOfBody = function(body) {
  return body.map(function(position) {
    return {x:position.x,y:position.y};
  })
}

const hasTouchedItself = function(head,body) {


}

const displayResult = function() {
  let result = document.getElementById("gameOver");
  let playAgainLink = document.getElementById("playAgain");
  result.innerHTML= "Game Over";
  playAgainLink.innerHTML = "Click here to Play Again";
}

const endGame= function(head) {
  if (hasTouchedBorder(head)) {
    clearInterval(animator);
    displayResult();
  }
  return;
}

const changeSnakeDirection=function(event) {
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

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
