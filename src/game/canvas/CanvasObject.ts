export interface UpdateOption {
  canvas: { width: number, height: number };
}

export interface CanvasObject {
  update(updateOption: UpdateOption): boolean;
}
