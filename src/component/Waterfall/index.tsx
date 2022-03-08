import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import styles from "./index.less";

interface IProps {
  renderChildren: React.FC<{
    [key: string]: any;
    index: number;
    onLoad: (event: BaseSyntheticEvent<{}, {}, HTMLImageElement>) => void;
  }>;
  column?: number;
  dataSource: {
    [key: string]: string;
  }[];
  key?: string;
}
interface IArea {
  width: number;
  left: number;
  height: number;
  top: number;
}
export default (props: IProps) => {
  const { column = 2, renderChildren, dataSource, key } = props;
  const [dataArea, setDataArea] = useState<IArea[]>([]);
  useEffect(() => {
    const width = parseFloat((100 / column).toFixed(2));

    dataSource.forEach((_, index) => {
      dataArea.push({
        width: width,
        left: (index % 2) * width,
        height: 0,
        top: 0,
      });
    });
    // console.log(dataArea);
    setDataArea(dataArea);
  }, []);
  const onLoad =
    (index: number) => (e: BaseSyntheticEvent<{}, {}, HTMLImageElement>) => {
      const height = e.target.getBoundingClientRect().height;
      if (dataArea[index].height !== height) {
        dataArea[index].height = height;
        setDataArea([...dataArea]);
      }
    };
  if (dataArea.length === 0) {
    return <div>loading...</div>;
  }
  return (
    <div className={styles.container}>
      {dataSource.map((data, index) => {
        const { height, width, left } = dataArea[index];
        return (
          <div
            ref={(ref) => {
              if (ref) {
                if (height === 0) {
                  dataArea[index].height = ref.getBoundingClientRect().height;
                  if (dataArea[index].height !== 0) {
                    setDataArea([...dataArea]);
                  }
                }
              }
            }}
            key={key ? data[key] : index}
            style={{
              width: width + "%",
              left: left + "%",
              height: height ? height + "px" : "auto",
              position: "absolute",
            }}
          >
            {renderChildren({
              ...data,
              index,
              onLoad: onLoad(index),
            })}
          </div>
        );
      })}
    </div>
  );
};
