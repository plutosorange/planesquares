const coordinates = [2, 4];
const wallCoords = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [0, 9],
  [9, 0],
  [9, 1],
  [9, 2],
  [9, 3],
  [9, 4],
  [9, 5],
  [9, 6],
  [9, 7],
  [9, 8],
  [9, 9],
  [1, 0],
  [1, 9],
  [2, 0],
  [2, 9],
  [3, 0],
  [3, 9],
  [4, 0],
  [4, 9],
  [5, 0],
  [5, 9],
  [6, 0],
  [6, 9],
  [7, 0],
  [7, 9],
  [8, 0],
  [8, 9]
];

let column;
let row;
let columnID;
let rowID;
let wallNegX = 5;
let wallPosX = 0;

function findW() {
  let wallY;
  let wallX;
  let coordinate;
  for (let i = 0; i <= wallCoords.length; i++) {
    for (let j = 0; j <= wallCoords[i][0]; j++) {
      if (j == wallCoords[i][0]) {
        wallY = j;
      }
    }
    for (let j = 0; j <= wallCoords[i][1]; j++) {
      if (j == wallCoords[i][1]) {
        wallX = j;
      }
    }
    coordinate = wallY.toString() + wallX.toString();
    let locolumn = document.getElementById(coordinate);
    locolumn.style = "background-color: gray;";
  }
}
function find() {
  for (let i = 0; i <= coordinates[0]; i++) {
    if (i == coordinates[0]) {
      row = document.getElementById(i);
      rowID = i;
      console.log(i);
      for (let j = 0; j <= coordinates[1]; j++) {
        if (j == coordinates[1]) {
          column = document.getElementById(rowID.toString() + j);
          columnID = rowID.toString() + j;
          console.log(j);
        }
      }
      column.style = "background-color: white;";
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function tryMove(dir) {
  let nextX = coordinates[0];
  let nextY = coordinates[1];

  if (dir === "up") {
    nextX -= 1;
  } else if (dir === "down") {
    nextX += 1;
  } else if (dir === "left") {
    nextY -= 1;
  } else if (dir === "right") {
    nextY += 1;
  }

  if (!checkWallCollision(nextX, nextY)) {
    column.style = "background-color: black;";
    coordinates[0] = nextX;
    coordinates[1] = nextY;
    find();
  }
}

function checkWallCollision(nextX, nextY) {
  for (let i = 0; i < wallCoords.length; i++) {
    if (wallCoords[i][0] === nextX && wallCoords[i][1] === nextY) {
      return true;
    }
  }
  return false;
}

document.onkeypress = (e) => {
  console.log(e.keyCode);
  if (e.keyCode == 115) {
    tryMove("down");
  }
  if (e.keyCode == 119) {
    tryMove("up");
  }
  if (e.keyCode == 97) {
    tryMove("left");
  }
  if (e.keyCode == 100) {
    tryMove("right");
  }
};

function loop() {
  while (true) {
    sleep(100);
    find();
    findW();
    if (true) {
      break;
    }
  }
}

loop();
