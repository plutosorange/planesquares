const coordinates = [0, 1, 1]
fetch("./src/map.json")
  .then(response => response.json())
  .then(data => {
    gameMap = data;
    initMap();
  });
let column
let row
let columnID
let rowID
let wallNegX = 5
let wallPosX = 0
    
function initMap() {
    for(let y = 0; y < 9; y++) {
        for(let x = 0; x < 9; x++) {
          gameMap[y][x].push(Math.floor(Math.random() * 8) + 1)
        }
    }
    alert(JSON.stringify(map))
}
function displayErase() {}
function findH() {
  for(let y = 0; y < 9; y++) {
    rowID = y
    for(let x = 0; x < 9; x++) {
      column = document.getElementById(rowID.toString() + x)
      switch (gameMap[y][x][0]) {
        case 0:
          column.style = "background-color: #000"
          break;
        case 1:
          column.style = "background-color: #222"
          break;
        case 2:
          column.style = "background-color: #444"
          break;
        case 3:
          column.style = "background-color: #666"
          break;
        case 4:
          column.style = "background-color: #888"
          break;
        case 5:
          column.style = "background-color: #aaa"
          break;
        case 6:
          column.style = "background-color: #ccc"
          break;
        case 7:
          column.style = "background-color: #eee"
          break;
        case 8:
          column.style = "background-color: #fff"
          break;
      }
    }
  }
}
function find() {
  for (let i = 0; i <= coordinates[0]; i++) {
    if (i == coordinates[0]) {
      row = document.getElementById(i)
      rowID = i
      console.log(i)
      for (let j = 0; j <= coordinates[1]; j++) {
        if (j == coordinates[1]) {
          column = document.getElementById(rowID.toString() + j)
          columnID = rowID.toString() + j
          console.log(j)
        }
      }
      column.style = "background-color: red;";
    }
  }
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
    /*if(coordinates[0] < 5) {
      column.style = "background-color: black;";
    coordinates[0] += 1
    find()
    }*/
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

loop()