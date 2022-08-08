export interface Point {
  x: number;
  y: number;
}

export interface KMeansPoint extends Point {
  index?: number;
}
