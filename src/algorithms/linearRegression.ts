import { Point } from "../types";

/**
 * 副驾驶牛逼
 */
export default function linearRegression(points: Point[]) {
  const length = points.length;
  const xSum = points.reduce((sum, point) => sum + point.x, 0);
  const ySum = points.reduce((sum, point) => sum + point.y, 0);
  const xySum = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const xSquaredSum = points.reduce((sum, point) => sum + point.x * point.x, 0);
  const weight =
    (xySum - (xSum * ySum) / length) / (xSquaredSum - (xSum * xSum) / length);
  const bias = (ySum - weight * xSum) / length;
  return { weight, bias };
}
