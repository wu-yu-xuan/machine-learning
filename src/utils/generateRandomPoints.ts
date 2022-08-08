interface GenerateRandomPointsOptions {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  count: number;
}

export default function generateRandomPoints({
  minX = 0,
  minY = 0,
  maxX = 1000,
  maxY = 1000,
  count,
}: GenerateRandomPointsOptions) {
  return new Array(count).fill(0).map(() => {
    const x = Number((minX + Math.random() * (maxX - minX)).toFixed(2));
    const y = Number((minY + Math.random() * (maxY - minY)).toFixed(2));
    return {
      x,
      y,
    };
  });
}
