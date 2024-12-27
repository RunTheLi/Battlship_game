// gameboard.js
import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = [];
    this.grid = Array(100).fill(null); // A 10x10 grid
  }

  placeShip(ship, startIdx, orientation) {
    // Check if ship fits on the board before placing
    const shipCoordinates = this.getShipCoordinates(startIdx, ship.length, orientation);
    if (shipCoordinates.some(coord => this.grid[coord] !== null)) {
      return false; // Invalid placement
    }
    
    // Place ship on the board
    shipCoordinates.forEach(coord => {
      this.grid[coord] = ship;
    });
    this.ships.push({ ship, coordinates: shipCoordinates });
    return true;
  }

  getShipCoordinates(startIdx, length, orientation) {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      let coord = orientation === 'horizontal' 
        ? startIdx + i 
        : startIdx + i * 10;
      coordinates.push(coord);
    }
    return coordinates;
  }

  receiveAttack(coord) {
    if (this.grid[coord] === null) {
      this.missedShots.push(coord);
      return false; // Miss
    }
    
    const ship = this.grid[coord];
    ship.hit();
    return true; // Hit
  }

  allSunk() {
    return this.ships.every(({ ship }) => ship.isSunk());
  }
}
