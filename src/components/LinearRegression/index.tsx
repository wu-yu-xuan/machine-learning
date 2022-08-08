import InputNumber from "rc-input-number";
import { useMemo, useState } from "react";
import linearRegression from "../../algorithms/linearRegression";
import generateRandomLinearPoints from "../../utils/generateRandomLinearPoints";
import CoordContainer from "../CoordContainer";
import PointComponent from "../PointComponent";
import styles from "./styles.module.less";

/**
 * 线性回归
 */
export default function LinearRegression() {
  const [weight, setWeight] = useState(1);

  const [bias, setBias] = useState(1);

  const [offset, setOffset] = useState(100);

  const [points, setPoints] = useState(() =>
    generateRandomLinearPoints({
      weight,
      bias,
      count: 100,
      offset,
    })
  );

  const [result, setResult] = useState<{ weight: number; bias: number }>();

  const targetLine = useMemo(() => {
    const x1 = 0;
    const y1 = weight * x1 + bias;
    const x2 = 1000;
    const y2 = weight * x2 + bias;
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" fill="#666" />;
  }, [weight, bias]);

  const calcLine = useMemo(() => {
    if (!result) {
      return null;
    }
    const x1 = 0;
    const y1 = result.weight * x1 + result.bias;
    const x2 = 1000;
    const y2 = result.weight * x2 + result.bias;
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#f00"
        fill="#f00"
        strokeWidth={5}
      />
    );
  }, [result]);

  return (
    <div className={styles.container}>
      <CoordContainer>
        {points.map((point) => {
          const key = [point.x, point.y].join(",");
          return <PointComponent key={key} {...point} />;
        })}
        {targetLine}
        {calcLine}
      </CoordContainer>
      <div className={styles.right}>
        <div>weight:</div>
        <InputNumber
          value={weight}
          onChange={(x) => {
            if (typeof x === "number") {
              setWeight(x);
              setPoints(
                generateRandomLinearPoints({
                  weight: x,
                  bias,
                  count: points.length,
                  offset,
                })
              );
              setResult(undefined);
            }
          }}
        />
        <div>bias:</div>
        <InputNumber
          value={bias}
          onChange={(x) => {
            if (typeof x === "number") {
              setBias(x);
              setPoints(
                generateRandomLinearPoints({
                  weight,
                  bias: x,
                  count: points.length,
                  offset,
                })
              );
              setResult(undefined);
            }
          }}
        />
        <div>offset:</div>
        <InputNumber
          value={offset}
          onChange={(x) => {
            if (typeof x === "number") {
              setOffset(x);
              setPoints(
                generateRandomLinearPoints({
                  weight,
                  bias,
                  count: points.length,
                  offset: x,
                })
              );
              setResult(undefined);
            }
          }}
        />
        <div>length:</div>
        <InputNumber
          value={points.length}
          onChange={(x) => {
            if (typeof x === "number") {
              setPoints(
                generateRandomLinearPoints({
                  weight,
                  bias,
                  count: Math.floor(x),
                  offset,
                })
              );
              setResult(undefined);
            }
          }}
        />
        <button
          onClick={() => {
            setPoints(
              generateRandomLinearPoints({
                weight,
                bias,
                count: points.length,
                offset,
              })
            );
            setResult(undefined);
          }}
        >
          重新生成点
        </button>
        <button
          onClick={() => {
            setResult(linearRegression(points));
          }}
        >
          线性回归
        </button>
        {result ? (
          <>
            <div>结果：</div>
            <div>
              y = {result.weight}x + {result.bias}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
