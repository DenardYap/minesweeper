export interface Coordinate {
  row: number;
  col: number;
}

export interface SquareObject {
  status: string;
  imgSrc: string | number;
  coordinate: Coordinate;
  bombCount: number;
}
