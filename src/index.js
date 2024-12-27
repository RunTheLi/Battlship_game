// index.js
import './styles.css';

// Ship class definition
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
}

// Gameboard class definition
class Gameboard {
  constructor() {
    this.grid = Array(100).fill(null); // Create a 10x10 grid
    this.missedAttacks = [];
    this.ships = [];
  }

  // Function to randomly place ships
  placeShipRandomly(ship) {
    let placed = false;
    while (!placed) {
      const randomIndex = Math.floor(Math.random() * 100); // Random starting point
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'; // Random direction
      if (this.canPlaceShip(ship, randomIndex, direction)) {
        this.placeShip(ship, randomIndex, direction);
        placed = true;
      }
    }
  }

  // Check if a ship can be placed at the given index in the given direction
  canPlaceShip(ship, startIdx, direction) {
    const size = 10;
    const shipLength = ship.length;

    // Check if ship is within bounds and doesn't collide with others
    for (let i = 0; i < shipLength; i++) {
      let idx = direction === 'horizontal' ? startIdx + i : startIdx + i * size;
      
      if (idx >= 100 || this.grid[idx] !== null || 
        (direction === 'horizontal' && startIdx % size + shipLength > size)) {
        return false;
      }
    }

    // Check for a 1-cell gap around the ship to ensure no proximity to other ships
    for (let i = 0; i < shipLength; i++) {
      let idx = direction === 'horizontal' ? startIdx + i : startIdx + i * size;

      // Check surrounding cells (1 cell gap)
      let surroundingCells = [
        idx - 1, idx + 1, // Horizontal gaps
        idx - size, idx + size, // Vertical gaps
        idx - size - 1, idx - size + 1, idx + size - 1, idx + size + 1 // Diagonal gaps
      ];

      // Filter out-of-bounds indexes
      surroundingCells = surroundingCells.filter(i => i >= 0 && i < 100);
      
      for (let i of surroundingCells) {
        if (this.grid[i] !== null) {
          return false; // There's another ship close by
        }
      }
    }

    return true;
  }

  // Place a ship at the given index and direction
  placeShip(ship, startIdx, direction) {
    const size = 10;
    for (let i = 0; i < ship.length; i++) {
      let idx = direction === 'horizontal' ? startIdx + i : startIdx + i * size;
      this.grid[idx] = ship;
    }
    this.ships.push({ ship, startIdx, direction });
  }

  // Receive an attack at the specified index
  receiveAttack(index) {
    const ship = this.grid[index];
    if (ship) {
      ship.hit();
      return true; // Hit
    } else {
      this.missedAttacks.push(index);
      return false; // Miss
    }
  }

  // Check if all ships are sunk
  allSunk() {
    return this.ships.every(({ ship }) => ship.isSunk());
  }

  // Generate a random attack for the computer
  randomAttack() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 100); // Random number between 0 and 99
    } while (this.missedAttacks.includes(randomIndex)); // Ensure it hasn't already been attacked
    return randomIndex;
  }
}

// Player class definition
class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(index, enemyBoard) {
    return enemyBoard.receiveAttack(index);
  }

  randomAttack(enemyBoard) {
    const attackIndex = this.gameboard.randomAttack();
    enemyBoard.receiveAttack(attackIndex);
    return attackIndex;
  }
}

// Initialize game elements
const player = new Player('Player');
const computer = new Player('Computer');

const playerBoardElement = document.querySelector('#player-board .grid');
const enemyBoardElement = document.querySelector('#enemy-board .grid');
const gameStatus = document.querySelector('#game-status');

// Create and place ships for both players
const playerShips = [
  new Ship(3), new Ship(3), new Ship(3), // 3 ships of length 3
  new Ship(4), new Ship(4), new Ship(4)  // 2 ships of length 4
];
const computerShips = [
  new Ship(3), new Ship(3), new Ship(3), // 3 ships of length 3
  new Ship(4), new Ship(4), new Ship(4)  // 2 ships of length 4
];

// Place ships randomly on the boards
playerShips.forEach(ship => player.gameboard.placeShipRandomly(ship));
computerShips.forEach(ship => computer.gameboard.placeShipRandomly(ship));

// Render gameboards
function renderBoard(boardElement, gameboard, isPlayerBoard) {
  boardElement.innerHTML = ''; // Clear the grid
  gameboard.grid.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.dataset.idx = idx;

    if (cell !== null && isPlayerBoard) {
      cellDiv.classList.add('ship');
      cellDiv.innerHTML = '🛥'; // Use ship emoji to represent the ship
    }

    cellDiv.addEventListener('click', () => {
      if (isPlayerBoard) return; // Prevent clicking on the player's board

      const coord = parseInt(cellDiv.dataset.idx);
      if (player.attack(coord, computer.gameboard)) {
        cellDiv.style.backgroundColor = 'red'; // Hit
      } else {
        cellDiv.style.backgroundColor = 'blue'; // Miss
      }

      if (computer.gameboard.allSunk()) {
        gameStatus.textContent = 'Player Wins!';
        return;
      }

      setTimeout(computerTurn, 1000);
    });

    boardElement.appendChild(cellDiv);
  });
}

function computerTurn() {
  const coord = computer.randomAttack(player.gameboard);
  const targetCell = playerBoardElement.querySelector(`[data-idx='${coord}']`);
  
  if (targetCell) {
    targetCell.style.backgroundColor = 'red'; // Computer hit
  }

  if (player.gameboard.allSunk()) {
    gameStatus.textContent = 'Computer Wins!';
  }
}

// Start game setup
document.querySelector('#start-game').addEventListener('click', () => {
  renderBoard(playerBoardElement, player.gameboard, true);
  renderBoard(enemyBoardElement, computer.gameboard, false);
  gameStatus.textContent = 'Game Started! Make your move!';
});
