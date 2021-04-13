import { SerialCharacter } from './character';

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;

}

export interface Pagination {
  results: SerialCharacter[];
  info: Info;
}
