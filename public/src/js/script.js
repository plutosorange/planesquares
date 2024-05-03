const coordinates = [2, 4];

function fetchWall() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../json/wallCoords.json');
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4  && xhr.status === 200) {
      let ret = JSON.parse(xhr.responseText);
      return ret;
    }
  }
  xhr.send()
}

const wallCoords = fetchWall()

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

/* function tryMove(dir) {
  let toIncr = 0;
  if(dir == 'up') {
      if(coordinates[0] > 0) {
        column.style = "background-color: black;";
        coordinates[0] -= 1
        find()
      }
  } else if(dir == 'down') {
      if(coordinates[0] < 9) {
        column.style = "background-color: black;";
        coordinates[0] += 1
        find()
      }
  } else if(dir == 'left') {
      if(coordinates[1] > 0) {
        column.style = "background-color: black;";
        coordinates[1] -= 1
        find()
      }
  } else if(dir == 'right') {
      if(coordinates[1] < 9) {
        column.style = "background-color: black;";
        coordinates[1] += 1
        find()
      }
  }
} */

function tryMove(dir) {
  let nextX = coordinates[0];
  let nextY = coordinates[1];

  // Calculate next position based on direction
  if (dir === "up") {
    nextX -= 1;
  } else if (dir === "down") {
    nextX += 1;
  } else if (dir === "left") {
    nextY -= 1;
  } else if (dir === "right") {
    nextY += 1;
  }

  // Check for wall collision
  if (!checkWallCollision(nextX, nextY)) {
    // No collision, move player
    column.style = "background-color: black;"; // Clear current position
    coordinates[0] = nextX;
    coordinates[1] = nextY;
    find(); // Update player's position on the grid
  }
}

// Function to check for wall collision
function checkWallCollision(nextX, nextY) {
  // Loop through wall coordinates
  for (let i = 0; i < wallCoords.length; i++) {
    // Check if next position overlaps with any wall coordinates
    if (wallCoords[i][0] === nextX && wallCoords[i][1] === nextY) {
      return true; // Collision detected
    }
  }
  return false; // No collision detected
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
