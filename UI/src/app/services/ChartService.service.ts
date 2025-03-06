import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _chartCanvas: HTMLCanvasElement | null = null;

  get chartCanvas(): HTMLCanvasElement | null {
    return this._chartCanvas;
  }

  setChartCanvas(canvas: HTMLCanvasElement): void {
    this._chartCanvas = canvas;
  }
}
