import { vec2 } from '../types/index';

export type Model2D = {
  // bounds of polygon to print in p5.draw
  vertices: vec2[];
  // offsets from transform.position for each bound
  offsets: vec2[];
}