interface CrossComponentProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
}

/**
 * 十字线
 */
export default function CrossComponent({
  x,
  y,
  color = "#000",
  size = 20,
}: CrossComponentProps) {
  return (
    <>
      <line
        x1={x - size}
        y1={y}
        x2={x + size}
        y2={y}
        stroke={color}
        strokeWidth={2}
      />
      <line
        x1={x}
        y1={y - size}
        x2={x}
        y2={y + size}
        stroke={color}
        strokeWidth={2}
      />
    </>
  );
}
