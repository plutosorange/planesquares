const coordinates = [0, 1, 1]
let gameMap
fetch("./public/src/map.json")
  .then(response => response.json())
  .then(data => {
    gameMap = data;
    initMap();
    loop();
  });
let column
let row
let columnID
let rowID
let wallNegX = 5
let wallPosX = 0
    
function initMap() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      gameMap[y][x].push(Math.floor(Math.random() * 8) + 1)
    }
  }
  alert(JSON.stringify(gameMap))
}

function displayErase() {}
function findH() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let cell = document.getElementById(y.toString() + x);
      if (!cell) continue;
      switch (gameMap[y][x][0]) {
        case 0: cell.style.backgroundColor = "#000"; break;
        case 1: cell.style.backgroundColor = "#222"; break;
        case 2: cell.style.backgroundColor = "#444"; break;
        case 3: cell.style.backgroundColor = "#666"; break;
        case 4: cell.style.backgroundColor = "#888"; break;
        case 5: cell.style.backgroundColor = "#aaa"; break;
        case 6: cell.style.backgroundColor = "#ccc"; break;
        case 7: cell.style.backgroundColor = "#eee"; break;
        case 8: cell.style.backgroundColor = "#fff"; break;
      }
    }
  }
}
function find() {
  const rowID = coordinates[0];
  const columnID = coordinates[1];
  column = document.getElementById(rowID.toString() + columnID);
  if (column) column.style.backgroundColor = "red";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function tryMove(dir) {
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
}

document.onkeypress = (e) => {
  console.log(e.keyCode)
  if (e.keyCode == 115) {
    tryMove('down')
  }
  if (e.keyCode == 119) {
    tryMove('up')
  }
  if (e.keyCode == 97) {
    tryMove('left')
  }
  if (e.keyCode == 100) {
    tryMove('right')
  }
}

function loop() {
  while (true) {
    sleep(100)
    find()
    findH()
    if (true) {
      break
    }
  }
}
