import Tooltip from "rc-tooltip";
import { Point } from "../../types";
import styles from "./styles.module.less";

export default function PointComponent({ x, y }: Point) {
  return (
    <Tooltip placement="top" overlay={`(${x}, ${y})`}>
      <circle cx={x} cy={y} r={2} className={styles.point} />
    </Tooltip>
  );
}
