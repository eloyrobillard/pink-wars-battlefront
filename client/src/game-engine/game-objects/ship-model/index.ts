import { triangle } from './triangle';
import ShipModel from './shipModel';
import { xWing } from './xWing';

interface ShipModels { 
  [key: string]: ShipModel
}

const shipModels: ShipModels = {
  'default': triangle,
  triangle,
  'x-wing': xWing,
  xWing,
}

export default shipModels;