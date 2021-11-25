import * as Phaser from "phaser"
import { SceneBase } from "./SceneBase";
import { HanabiCircle } from "./canvas/HanabiCircle";
import { StraightShot } from "./canvas/StraightShot";
import { CanvasObject } from "./canvas/CanvasObject";
import { Position } from "./types";
export class PlayScene extends SceneBase {
  private ctx: CanvasRenderingContext2D;
  private canvas: Phaser.Textures.CanvasTexture;
  private objects: CanvasObject[];
  private userScript: string;
  private onUserScriptError: (error: Error) => void;

  public init(data: { userScript: string, onUserScriptError: (error: Error) => void }) {
    this._init(30);
    this.objects = [];
    this.userScript = data.userScript;
    this.onUserScriptError = data.onUserScriptError;
  }

  public preload() {
    this._preload();
    this.load.image('square', 'square10x.png');

    if (this.textures.get('shotCanvas')) {
      this.textures.remove('shotCanvas');
    }
    const { width, height } = this.sys.game.canvas;
    this.canvas = this.textures.createCanvas('shotCanvas', width, height);
    
    this.ctx = this.canvas.context;
    this.load.image('shotCanvas');
  }

  private createHanabiShot(color: string, endPos: Position, radius: number) {
    const startTime = Date.now();
    this.objects.push(new StraightShot(this.ctx, color, { x: endPos.x, y: 0 }, endPos, startTime, startTime + 3000));
    this.objects.push(new HanabiCircle(this.ctx, color, endPos, radius, startTime + 3000, startTime + 6000));
  }

  public create() {
    this._create();

    const { width, height } = this.sys.game.canvas;
    const canvasImage = this.add.image(width / 2, height / 2, 'shotCanvas');
    canvasImage.depth = -1000;

    const self = this;
    const shot = {
      firework: (options: { x: number, y: number }) => {
        self.createHanabiShot('#eeee00', { x: options.x, y: options.y }, 250);
      }
    }
    const userFunction = new Function('shot', this.userScript);
    try {
      userFunction(shot);
    } catch (err) {
      this.onUserScriptError(err);
      this.scene.stop();
    }
  }

  public update() {
    this._update();

    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    const { width, height } = this.sys.game.canvas;
    this.ctx.fillRect(0, 0, width, height);

    this.objects.forEach((obj) => { obj.update(); });
	
    this.canvas.refresh();

    const imageData = this.ctx.getImageData(this.player.x, this.player.y, 1, 1).data;
    if (imageData[0] >= 128 || imageData[1] >= 128 || imageData[2] >= 128) {
      this.add.text(10, 300 - 24, 'BOMB!!', { fontFamily: 'sans-serif', fontSize: '48px' });
    }
  }
}