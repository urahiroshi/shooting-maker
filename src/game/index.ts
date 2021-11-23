import * as Phaser from "phaser";
import { PlayScene } from "./PlayScene";
import { GameOver } from "./GameOver";

export class Game extends Phaser.Game {
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
    this.scene.add('play', PlayScene, false);
  }

  public play(userScript: string, onUserScriptError: (error: Error) => void) {
    this.scene.start('play', { userScript, onUserScriptError });
  }
}

export const initGame = (width: number, height: number, parent: HTMLElement) => {
  return new Game(width, height, parent);
};
