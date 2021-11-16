import { triangle } from './triangle';
import ShipModel from './shipModel';
import { xWing } from './xWing';
import { vultureDroid } from './vultureDroid';

interface ShipModels { 
  [key: string]: ShipModel
}

const shipModels: ShipModels = {
  'default': triangle,
  triangle,
  'x-wing': xWing,
  xWing,
  'droid-fighter': vultureDroid,
  'droidFighter': vultureDroid,
  'vulture-droid': vultureDroid,
  vultureDroid
}

export default shipModels;