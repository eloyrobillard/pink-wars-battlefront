import { Maybe, Some, None } from '../types/index';
import { Squadron } from './squadron';

export class Battalion {
  squadrons: Maybe<Squadron>[] = Array.from({ length: 3}, () => new None())
}