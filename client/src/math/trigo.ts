/**
  * Cos internally converting angle in degrees to radians.
  * @param {number} angle in degrees
  */
export function cosConvert(angle: number) {
  return Math.cos(angle / 180 * Math.PI);
}

/**
  * Sin internally converting angle in degrees to radians.
  * @param {number} angle in degrees
  */
export function sinConvert(angle: number) {
  return Math.sin(angle / 180 * Math.PI);
}