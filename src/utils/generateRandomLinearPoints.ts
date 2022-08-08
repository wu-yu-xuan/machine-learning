import { Point } from "../types";

interface GenerateRandomLinearPointsOptions {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  count: number;
  weight: number;
  bias: number;
  offset: number;
}

export default function generateRandomLinearPoints({
  minX = 0,
  minY = 0,
  maxX = 1000,
  maxY = 1000,
  count,
  weight,
  bias,
  offset,
}: GenerateRandomLinearPointsOptions) {
  const result: Point[] = [];

  while (result.length < count) {
    const x = Number((minX + Math.random() * (maxX - minX)).toFixed(2));
    const actualOffset = offset - Math.random() * offset * 2;
    const y = Number((weight * x + bias + actualOffset).toFixed(2));
    if (y >= minY && y <= maxY) {
      result.push({ x, y });
    }
  }

  return result;
}
