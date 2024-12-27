// player.js
import Gameboard from './gameboard.js';

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(coord, enemyGameboard) {
    return enemyGameboard.receiveAttack(coord);
  }

  // Computer AI to choose a random attack
  randomAttack(enemyGameboard) {
    let randomCoord;
    do {
      randomCoord = Math.floor(Math.random() * 100);
    } while (enemyGameboard.grid[randomCoord] !== null && enemyGameboard.grid[randomCoord] !== undefined);
    
    return this.attack(randomCoord, enemyGameboard);
  }
}
