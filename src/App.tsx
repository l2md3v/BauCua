import React, { useCallback, useState } from 'react';

import styles from './App.module.css';
import clsx from 'clsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const seeds = [
  '/images/bau.png',
  '/images/cua.png',
  '/images/tom.png',
  '/images/ca.png',
  '/images/ga.png',
  '/images/nai.png',
];

const TIME_SHAKING = 2000;
const TIME_PLATE_ABOVE_DISABLE = 1000;

const App: React.FC = () => {
  const [seedIndex, setSeedIndex] = useState<{
    seedOne: number;
    seedTwo: number;
    seedThree: number;
  }>({ seedOne: 0, seedTwo: 0, seedThree: 0 });

  const [seedAboveActive, setSeedAboveActive] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const handleShake = useCallback(() => {
    if (!isShaking) {
      setIsShaking(true);
      const shaking = new Promise((resolve) => {
        setTimeout(() => {
          const timer = setInterval(() => {
            const s1 = Math.floor(Math.random() * seeds.length);
            const s2 = Math.floor(Math.random() * seeds.length);
            const s3 = Math.floor(Math.random() * seeds.length);

            setSeedIndex({ seedOne: s1, seedTwo: s2, seedThree: s3 });
          }, 100);

          setTimeout(() => {
            clearInterval(timer);
            setIsShaking(false);
            resolve(true);
          }, TIME_SHAKING);
        }, TIME_PLATE_ABOVE_DISABLE);
      });

      shaking.then(() => {
        toast.dark('Xốc xong rồi nè', {
          progressStyle: { backgroundColor: 'lime' },
        });
      });
    } else {
      toast.info('Đang sốc nè', {
        style: { backgroundColor: 'black', color: 'white' },
        progressStyle: { backgroundColor: 'lime' },
      });
    }
  }, [isShaking]);

  const handleCloseLid = useCallback(() => {
    setSeedAboveActive(!seedAboveActive);
  }, [seedAboveActive]);

  return (
    <main className={styles.container}>
      <section className={styles.seed_container}>
        <img src={seeds[seedIndex['seedOne']]} alt="seedOne" />
        <img src={seeds[seedIndex['seedTwo']]} alt="seedTwo" />
        <img src={seeds[seedIndex['seedThree']]} alt="seedThree" />
        <section
          className={clsx([
            styles.plate_above,
            seedAboveActive && styles.active,
          ])}
        >
          {isShaking && <img src="/images/shaking-meme.gif" alt='loading meme' />}
        </section>
      </section>

      <section className={styles.actions}>
        <button onClick={handleShake}>Xốc</button>
        <button onClick={handleCloseLid}>
          {seedAboveActive ? 'Mở nắp' : 'Đóng nắp'}
        </button>
      </section>
      <ToastContainer />
    </main>
  );
};

export default App;