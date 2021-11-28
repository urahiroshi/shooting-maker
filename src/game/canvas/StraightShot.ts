import { Position } from '../types';
import { CanvasObject } from './CanvasObject';

export class StraightShot implements CanvasObject {
  private _ctx: CanvasRenderingContext2D;
  private _color: string;
  private _pos: Position;
  private _startPos: Position;
  private _endPos: Position;
  private _startTime: number;
  private _endTime: number;

  public constructor(
    ctx: CanvasRenderingContext2D,
    color: string,
    startPos: Position,
    endPos: Position,
    startTime: number,
    endTime: number,
  ) {
    this._ctx = ctx;
    this._color = color;
    this._startPos = startPos;
    this._endPos = endPos;
    this._pos = {...this._startPos};
    this._startTime = startTime;
    this._endTime = endTime;
  }
  
  public update(): boolean {
    const now = Date.now();
    if (now < this._startTime) {
      return true;
    } else if (now > this._endTime) {
      return false;
    }

    this._ctx.globalCompositeOperation = 'lighter';

    this._ctx.strokeStyle = this._color;
    this._ctx.lineWidth = 5;
    this._ctx.beginPath();

    const x = this._startPos.x + (this._endPos.x - this._startPos.x) * ((now - this._startTime) / (this._endTime - this._startTime));
    const y = this._startPos.y + (this._endPos.y - this._startPos.y) * ((now - this._startTime) / (this._endTime - this._startTime));

    this._ctx.moveTo(this._pos.x, this._pos.y);
    this._ctx.lineTo(x, y);
    this._pos = { x, y };
    
    this._ctx.stroke();
    return true;
  }
}