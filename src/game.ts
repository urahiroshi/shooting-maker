import * as Phaser from "phaser";
import { Level1 } from "./level1";
import { Level2 } from "./level2";
import { GameOver } from "./game-over";

class Game extends Phaser.Game {
  constructor(width: number, height: number, parent: HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width,
      height,
      parent,
      backgroundColor: '#222',
      physics: {
        default: 'arcade',
      },
    };
    super(config);

    this.scene.add(GameOver.KEY, GameOver, false);
    const LevelClasses = [Level1, Level2];
    for (let LevelClass of LevelClasses) {
      this.scene.add(LevelClass.KEY, LevelClass, false);
    }
    for (let LevelClass of LevelClasses) {
      if (`#${LevelClass.KEY}` === window.location.hash) {
        this.scene.start(LevelClass.KEY);
        return;
      }
    }
    this.scene.start(Level1.KEY);
  }
}

export const load = (width: number, height: number, parent: HTMLElement) => {
  new Game(width, height, parent);
};
