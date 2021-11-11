import { randRot, randPos, randDir } from './random';
import { sinConvert, cosConvert } from './trigo';
import { lerp } from './lerp';

const math = { 
  lerp, 
  cosConvert, 
  sinConvert, 
  randRot, 
  randPos,
  randDir
};

export default math;