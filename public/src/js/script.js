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

const noise = new Noise(Math.random());

function initMap() {
  const scale = 0.3;
  
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let noiseVal = noise.perlin2(x * scale, y * scale);
      
      noiseVal = (noiseVal + 1) / 2;
      
      let height = Math.floor(noiseVal * 8);
      
      gameMap[y][x][0] = height;
      updateTile(x,y,height)
    }
  }
  alert(JSON.stringify(gameMap));
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

function updateTile(x, y, height) {
  console.log(`Tile at (${x}, ${y}) set to height ${height}`);
  let cell = document.getElementById(y.toString() + x);
  if (!cell) return;

  cell.className = `tile height-${height}`;
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
  let currentRow = coordinates[0];
  let currentCol = coordinates[1];
  
  let targetRow = currentRow;
  let targetCol = currentCol;
  if (dir === "up" && currentRow > 0) {
    targetRow--;
  } else if (dir === "down" && currentRow < 9) {
    targetRow++;
  } else if (dir === "left" && currentCol > 0) {
    targetCol--;
  } else if (dir === "right" && currentCol < 9) {
    targetCol++;
  } else {
    return;
  }
  
  let currentHeight = gameMap[currentRow][currentCol][0];
  let targetHeight = gameMap[targetRow][targetCol][0];
  
  if (Math.abs(targetHeight - currentHeight) > 1) {
    console.log(`Can't move from z=${currentHeight} to z=${targetHeight}! Too steep!`);
    return;
  }
  
  let prevCell = document.getElementById(currentRow.toString() + currentCol);
  if (prevCell) {
    switch (currentHeight) {
      case 0: prevCell.style.backgroundColor = "#000"; break;
      case 1: prevCell.style.backgroundColor = "#222"; break;
      case 2: prevCell.style.backgroundColor = "#444"; break;
      case 3: prevCell.style.backgroundColor = "#666"; break;
      case 4: prevCell.style.backgroundColor = "#888"; break;
      case 5: prevCell.style.backgroundColor = "#aaa"; break;
      case 6: prevCell.style.backgroundColor = "#ccc"; break;
      case 7: prevCell.style.backgroundColor = "#eee"; break;
      case 8: prevCell.style.backgroundColor = "#fff"; break;
    }
  }
  
  coordinates[0] = targetRow;
  coordinates[1] = targetCol;
  find();
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
    findH()
    find()
    if (true) {
      break
    }
  }
}
