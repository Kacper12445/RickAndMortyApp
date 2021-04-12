import { serialCharacter } from './character'

export class info {
  count: number = 0;
  pages: number = 0;
  next: string = '';
  prev: string = '';
}

export interface IPagination {
  info: info
  //,
  // results: serialCharacter[]
}




// export interface result {
//   serialCharacter[]
// }
