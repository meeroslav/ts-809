import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import * as style from './style.css';

interface Props {
  url: string;
  position: number;
}

const pointsPlaceholder = Array(16).fill(false);

const Track: FunctionalComponent<Props> = ({ url, position }: Props) => {
  const [points, setPoints] = useState<[string, boolean[]]>([
    url,
    pointsPlaceholder,
  ]);

  const togglePoint = (index: number) => () => {
    setPoints([
      points[0],
      [
        ...points[1].slice(0, index),
        !points[1][index],
        ...points[1].slice(index + 1),
      ],
    ]);
  };

  return (
    <div class={style.track}>
      <label class={style.label}>{url}</label>
      {points[1].map((point, index) => (
        <button
          key={index}
          class={`${style.point} ${point ? style.selected : ''} ${
            (index === position) ? style.marked : ''
          }`}
          onClick={togglePoint(index)}
        />
      ))}
    </div>
  );
};

export default Track;
