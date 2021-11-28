import { Position, Speed } from '../types';
import { CanvasObject, UpdateOption } from './CanvasObject';

export class CircleShot implements CanvasObject {
  private _ctx: CanvasRenderingContext2D;
  private _color: string;
  private _radius: number;
  private _pos: Position;
  private _startPos: Position;
  private _speed: Speed;
  private _startTime: number;

  public constructor(
    ctx: CanvasRenderingContext2D,
    color: string,
    radius: number,
    startPos: Position,
    speed: Speed,
    startTime: number,
  ) {
    this._ctx = ctx;
    this._color = color;
    this._radius = radius;
    this._startPos = startPos;
    this._speed = speed;
    this._startTime = startTime;
  }
  
  public update(updateOption: UpdateOption): boolean {
    const now = Date.now();
    const elapsedTime = now - this._startTime;
    const x = this._startPos.x + (this._speed.x * elapsedTime / 1000);
    const y = this._startPos.y + (this._speed.y * elapsedTime / 1000);
    if (x < 0 || x > updateOption.canvas.width || y < 0 || y > updateOption.canvas.height) {
      return false;
    }

    this._ctx.globalCompositeOperation = 'lighter';

    this._ctx.beginPath();
    this._ctx.arc(x, y, this._radius, 0, 2 * Math.PI);
    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    return true;
  }
}