import { Location } from './location'


export interface Origin {
  name: string;
}


export interface SerialCharacter {
  id: string;
  name: string;
  status: string;
  gender: string;
  species: string;
  location: Location;
  image: string;
  origin: Origin;
  // episodes: string[]
}
