import * as Phaser from "phaser"
import { SceneBase } from "./SceneBase";
import { HanabiCircle } from "./canvas/HanabiCircle";
import { StraightShot } from "./canvas/StraightShot";
import { CanvasObject } from "./canvas/CanvasObject";
import { Position, Speed } from "./types";
import { CircleShot } from "./canvas/CircleShot";
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

  private createCircleShot(startX: number, radius: number, speed: Speed) {
    this.objects.push(new CircleShot(this.ctx, '#e6eeef', radius, { x: startX, y: 0 }, speed, Date.now()));
  }

  private executeUserScript() {
    const self = this;
    const shot = {
      bullet: (options: { startX: number, radius: number, speedX: number, speedY: number }) => {
        self.createCircleShot(options.startX, options.radius, { x: options.speedX, y: options.speedY });
      },
      firework: (options: { x: number, y: number }) => {
        self.createHanabiShot('#eeee00', { x: options.x, y: options.y }, 250);
      },
    };
    const userFunction = new Function('shot', this.userScript);
    try {
      userFunction(shot);
    } catch (err) {
      this.onUserScriptError(err);
      this.scene.stop();
    }
  }

  public create() {
    this._create();

    const { width, height } = this.sys.game.canvas;
    const canvasImage = this.add.image(width / 2, height / 2, 'shotCanvas');
    canvasImage.depth = -1000;

    this.executeUserScript();
  }

  public update() {
    this._update();

    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    const { width, height } = this.sys.game.canvas;
    this.ctx.fillRect(0, 0, width, height);

    const canvas = this.sys.game.canvas;
    const validObjects = this.objects.filter(obj =>  obj.update({ canvas }));
    this.objects = validObjects;
	
    this.canvas.refresh();

    const imageData = this.ctx.getImageData(this.player.x, this.player.y, 1, 1).data;
    if (imageData[0] >= 128 || imageData[1] >= 128 || imageData[2] >= 128) {
      this.add.text(10, 300 - 24, 'BOMB!!', { fontFamily: 'sans-serif', fontSize: '48px' });
    }
  }
}