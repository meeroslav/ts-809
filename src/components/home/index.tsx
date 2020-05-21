import { FunctionalComponent, h } from 'preact';
import * as style from './style.css';
import { PropRef, useEffect, useRef, useState } from 'preact/hooks';
import Track from '../track';
import { BufferLoader } from '../../utils/buffer-loader';

const BPM_MINUTE = 60000 / 4;
const DEFAULT_BPM = 125;

const useInterval = (callback: () => void, delay: number, started: boolean) => {
  const savedCallback: PropRef<any> = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      savedCallback.current();
    }

    if (started) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, started]);
};

const samples = [
  '909 Clap_FAT.wav',
  '909 Closed_FAT.wav',
  '909 Open_FAT.wav',
  '909 Snare_FAT.wav',
  'Chilled.wav',
  'Djembe03_FAT.wav',
  'Djembe04_FAT.wav',
  'Djembe05_FAT.wav',
  'Urban Kick_FAT.wav',
];

const Home: FunctionalComponent = () => {
  const [position, setPosition] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
  const [delay, setDelay] = useState<number>(BPM_MINUTE / DEFAULT_BPM);
  const [bufferSources, setBufferSources] = useState<AudioBufferSourceNode[]>(
    []
  );
  const [started, setStarted] = useState(false);

  const context = new AudioContext();
  const bufferLoader = new BufferLoader(
    context,
    samples.map(s => `samples/${s}`),
    (bufferList: AudioBuffer[]) => {
      setBufferSources(
        bufferList.map(buffer => {
          const audio = context.createBufferSource();
          audio.buffer = buffer;
          audio.connect(context.destination);
          return audio;
        })
      );
    }
  );
  bufferLoader.load();

  useInterval(
    () => {
      setPosition((position + 1) % 16);
    },
    delay,
    started
  );

  // update the current time
  const increment = () => {
    setBpm(bpm + 1);
    setDelay(BPM_MINUTE / bpm);
  };

  const decrement = () => {
    setBpm(bpm - 1);
    setDelay(BPM_MINUTE / bpm);
  };

  const toggleStarted = () => {
    setStarted(!started);
  };

  const playSound = (src: string, index: number) => () => {
    // do something with sound
    if (bufferSources[index]) {
      console.log('Should play', src, position);
      bufferSources[index].start(0);
    }
  };

  return (
    <div class={style.home}>
      <h1>TransistorScript 809</h1>
      <button onClick={toggleStarted}>{started ? 'STOP' : 'START'}</button>

      <p>
        <button onClick={decrement}>-</button>
        <label>{bpm}</label>
        <button onClick={increment}>+</button>
      </p>

      <p>
        {samples.map((sample, index) => (
          <Track
            key={index}
            url={sample}
            position={position}
            play={playSound(sample, index)}
          />
        ))}
      </p>
    </div>
  );
};

export default Home;
