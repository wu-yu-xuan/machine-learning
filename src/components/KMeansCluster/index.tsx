import InputNumber from "rc-input-number";
import { Fragment, useState } from "react";
import kMeansCluster from "../../algorithms/kMeansCluster";
import { KMeansPoint, Point } from "../../types";
import getColorByIndex from "../../utils/color";
import generateRandomPoints from "../../utils/generateRandomPoints";
import CoordContainer from "../CoordContainer";
import CrossComponent from "../CrossComponent";
import PointComponent from "../PointComponent";
import styles from "./styles.module.less";

/**
 * K-means 聚类
 */
export default function KMeansCluster() {
  const [count, setCount] = useState(1000);

  const [k, setK] = useState(9);

  const [points, setPoints] = useState<KMeansPoint[]>(() =>
    generateRandomPoints({ count })
  );

  const [centerPoints, setCenterPoints] = useState<Point[]>();

  return (
    <div className={styles.container}>
      <CoordContainer>
        {points.map((point) => {
          const key = [point.x, point.y].join(",");
          return (
            <PointComponent
              key={key}
              {...point}
              color={getColorByIndex(point.index)}
            />
          );
        })}
        {Array.isArray(centerPoints)
          ? centerPoints.map((point, index) => {
              return (
                <CrossComponent {...point} color={getColorByIndex(index)} />
              );
            })
          : null}
      </CoordContainer>
      <div className={styles.right}>
        <div>count:</div>
        <InputNumber
          value={count}
          onChange={(x) => {
            if (typeof x === "number") {
              setCount(x);
              setPoints(
                generateRandomPoints({
                  count: x,
                })
              );
              setCenterPoints(undefined);
            }
          }}
        />
        <div>K:</div>
        <InputNumber
          value={k}
          onChange={(x) => {
            if (typeof x === "number") {
              setK(x);
              setCenterPoints(undefined);
            }
          }}
        />
        <button
          onClick={() => {
            setPoints(
              generateRandomPoints({
                count,
              })
            );
            setCenterPoints(undefined);
          }}
        >
          重新生成
        </button>
        <button
          onClick={() => {
            const innerCenterPoints = Array.isArray(centerPoints)
              ? centerPoints
              : generateRandomPoints({ count: k });
            const { points: newPoints, centerPoints: newCenterPoints } =
              kMeansCluster({
                points,
                centerPoints: innerCenterPoints,
              });
            setPoints(newPoints);
            setCenterPoints(newCenterPoints);
          }}
        >
          聚类
        </button>
        {Array.isArray(centerPoints)
          ? centerPoints.map((point) => {
              const key = [point.x, point.y].join(",");
              return (
                <Fragment key={key}>
                  <div>x: {point.x.toFixed(2)}</div>
                  <div>y: {point.y.toFixed(2)}</div>
                </Fragment>
              );
            })
          : null}
      </div>
    </div>
  );
}
