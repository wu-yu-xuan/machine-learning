import { KMeansPoint, Point } from "../types";

interface KMeansClusterOptions {
  points: KMeansPoint[];
  centerPoints: Point[];
}

/**
 * K-聚类算法
 */
export default function kMeansCluster({
  points,
  centerPoints,
}: KMeansClusterOptions) {
  if (!points.length || !centerPoints.length) {
    throw new Error("points or centerPoints is empty");
  }

  const assigned = typeof points[0].index === "number";

  const innerPoints = assigned
    ? points
    : assignPointsToCenterPoints({ points, centerPoints });

  const newCenterPoints = generateCenterPoints(innerPoints);

  return {
    points: assignPointsToCenterPoints({
      points: innerPoints,
      centerPoints: newCenterPoints,
    }),
    centerPoints: newCenterPoints,
  };
}

function assignPointsToCenterPoints({
  points,
  centerPoints,
}: KMeansClusterOptions): KMeansPoint[] {
  return points.map((point) => {
    const distanceArray = centerPoints.map((centerPoint) => {
      return Math.sqrt(
        Math.pow(point.x - centerPoint.x, 2) +
          Math.pow(point.y - centerPoint.y, 2)
      );
    });

    const index = distanceArray.reduce((acc, cur, index) => {
      if (cur < distanceArray[acc]) {
        return index;
      }
      return acc;
    }, 0);

    return { ...point, index };
  });
}

function generateCenterPoints(points: KMeansPoint[]): Point[] {
  const pointArray: Point[][] = [];

  for (const point of points) {
    if (typeof point.index === "number") {
      if (!Array.isArray(pointArray[point.index])) {
        pointArray[point.index] = [];
      }
      pointArray[point.index].push(point);
    }
  }

  return pointArray.map((array) => {
    const xSum = array.reduce((sum, point) => sum + point.x, 0);
    const ySum = array.reduce((sum, point) => sum + point.y, 0);
    return {
      x: xSum / array.length,
      y: ySum / array.length,
    };
  });
}
