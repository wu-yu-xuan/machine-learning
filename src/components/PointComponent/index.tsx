import Tooltip from "rc-tooltip";
import { Point } from "../../types";
import styles from "./styles.module.less";

interface PointComponentProps extends Point {
  color?: string;
}

export default function PointComponent({
  x,
  y,
  color = "#666",
}: PointComponentProps) {
  return (
    <Tooltip placement="top" overlay={`(${x}, ${y})`}>
      <circle
        cx={x}
        cy={y}
        r={2}
        className={styles.point}
        fill={color}
        stroke={color}
      />
    </Tooltip>
  );
}
