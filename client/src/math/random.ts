import { vec2 } from '../game-engine/types/index';

export function randRot() {
  return Math.floor(Math.random() * 360);
}

export function randPos() {
  // +10/ -10 to stay away from screen bounds
  const x = Math.floor(Math.random() * window.innerWidth - 10) + 10;
  const y = Math.floor(Math.random() * window.innerHeight - 10) + 10;
  return new vec2(x, y);
}

export function randDir() {
  return Math.random() - 0.5;
}