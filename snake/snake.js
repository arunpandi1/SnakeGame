const gameBoard = document.getElementById("gameboard");
const scoreText = document.getElementById("scoreval");
const lifeText = document.getElementById("lifeval");
const audioone = document.getElementById("audioone");
const Nameone = document.getElementById("Nameone");
// const context = gameBoard.getcontext('2d');
const context = gameBoard.getContext("2d");
// const front=getElementById('frontend');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 15;

let foodX;
let foodY;
let xVel = 15;
let yVel = 0;
let score = 0;
let life = 0;
let active = true;
let started = false;
let Restarted = false;

let snake = [
  { x: UNIT * 3, y: 0 },
  { x: UNIT * 2, y: 0 },
  { x: UNIT, y: 0 },
  { x: 0, y: 0 },
];
// window.addEventListener('keydown',keyPress)
window.addEventListener(
  "keydown",
  keyPress
  // (e)=>{
  //     console.log('pressed key')
  //     console.log('key',e.keyCode)
  //     if(e.keycode == 37){
  //             xVel = 0;
  //             yVel = UNIT;
  //     }
  // }
);

startGame();
function startGame() {
  context.fillStyle = "#212121";
  //fillRect(xstart,ystart,width,height)
  context.fillRect(0, 0, WIDTH, HEIGHT);
  createFood();
  displayFood();
  drawSnake();
  // moveSnake();
}
function clearBoard() {
  context.fillStyle = "#212121";
  //fillRect(xstart,ystart,width,height)
  context.fillRect(0, 0, WIDTH, HEIGHT);
}
function createFood() {
  foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
  foodY = Math.floor((Math.random() * HEIGHT) / UNIT) * UNIT;
}
function displayFood() {
  context.fillStyle = "red";
  // context.strokeRect=(foodX, foodY, UNIT, UNIT);
  // context.fillStyle='red 5px border redius';
  context.fillRect(foodX, foodY, UNIT, UNIT);
}
function drawSnake() {
  context.fillStyle = "yellow";

  snake.forEach((part) => {
    context.fillRect(part.x, part.y, UNIT, UNIT);
    context.strokeRect(part.x, part.y, UNIT, UNIT);
    // console.log(part.x)
  });
}
function moveSnake() {
  let head = {
    x: snake[0].x + xVel,
    y: snake[0].y + yVel,
  };

  //  console.log(head ,'head')
  snake.unshift(head);

  // head.forEach((partone)=>{
  //     console.log(partone.x)
  // })
  if (snake.x == head.x && snake.y == head.y) {
    active = false;
  } else {
    active = true;
  }
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    console.log(snake[0].x);
    scoreText.innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}
function nextCont() {
  if (active) {
    setTimeout(() => {
      clearBoard();
      displayFood();
      moveSnake();
      drawSnake();
      gameOver();
      // Restart();
      nextCont();
    }, 160);
  } else {
    clearBoard();
    // audioone.pause();
    context.font = "bold 50px serif";
    context.fillStyle = "white ";
    context.textAlign = "center";
    context.fillText("Game Over!!!", WIDTH / 2, HEIGHT / 2);
    context.fillText(`Your Score is:${score}`, WIDTH / 2, HEIGHT / 1.5);
    localStorage.setItem("score", score);
    console.log(score);
  }
}
// function Restart() {

//     if (Restarted) {

//         active = false;

//     }
//     else {
//         clearBoard();
//         // audioone.pause();
//         context.font = 'bold 20px serif';
//         context.fillStyle = 'white ';
//         context.textAlign = 'center';
//         context.fillText('press the Restart', WIDTH / 2, HEIGHT / 2);
//         // context.fillText(`Your Score is:${score}`, WIDTH / 2, HEIGHT / 1.5);
//         console.log(score)
//     }

// }

function keyPress(event) {
  console.log(event.keyCode);
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  console.log(event.keyCode, event.keyPress);

  switch (true) {
    case event.keyCode == LEFT && xVel != UNIT:
      xVel = -UNIT;
      yVel = 0;
      break;

    case event.keyCode == RIGHT && xVel != -UNIT:
      xVel = UNIT;
      yVel = 0;
      break;

    case event.keyCode == UP && yVel != UNIT:
      xVel = 0;
      yVel = -UNIT;
      break;

    case event.keyCode == DOWN && yVel != -UNIT:
      xVel = 0;
      yVel = UNIT;
      break;
  }
}
function gameOver() {
  // if (snake[0].x < 0 || snake[0].x >= WIDTH || snake[0].y < 0 || snake[0].y >= HEIGHT) {
  //     life += 1;
  //     lifeText.innerHTML = life;
  //     // nextCont();
  // }

  // if (life == 3) {
  //     active = false;
  // }

  switch (true) {
    case snake[0].x < 0:
    //         // active = false;
    //         life += 1;
    //         lifeText.innerHTML = life
    //         break;

    case snake[0].x >= WIDTH:
    //         // active = false;
    //         life =+ 1;
    //         lifeText.innerHTML = life;
    //         break;

    case snake[0].y < 0:
    //         // active = false;
    //         life =+ life;
    //         lifeText.innerHTML = life;
    //         break;

    case snake[0].y >= HEIGHT:
      // life += 1;
      // lifeText.innerHTML = life;
      active = false;
    // Restarted = true;
  }
}
console.log(life);

function start() {
  if (!started) {
    started = true;
    localStorage.setItem("Name", prompt("Welcome!!! Enter your Name"));

    nextCont();
    var nametwo = localStorage.getItem("Name");
    Nameone.innerHTML = "Player" + ":" + nametwo;
    // audioone.play();
  }
}
