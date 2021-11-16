import { vultureDroid } from './vultureDroid';
import { tieFighter } from './tieFighter';
import { triangle } from './triangle';
import { xWing } from './xWing';

export default function retrieveShipModel (model: string) {
	switch (model) {
    case 'tie-fighter':
    case 'tieFighter':
      return { model: tieFighter, count: 8 };
    case 'x-wing':
    case 'xWing':
      return { model: xWing, count: 6 };
        
        case 'droid-fighter':
    case 'droidFighter':
    case 'vulture-droid':
    case 'vulture':
    case 'vultureDroid':
      return { model: vultureDroid, count: 10 };
    
    default:
    case 'default':
    case 'triangle':
      return { model: triangle, count: 6 };
  }
}
