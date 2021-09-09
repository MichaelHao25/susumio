import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styles from './index.less';

export const Loading = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      const loading = lottie.loadAnimation({
        container: ref.current, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('./loading.json'),
        // path:'https://assets2.lottiefiles.com/packages/lf20_Ag1Gfj.json'
      });
      loading.play();
    }
  }, [ref]);
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.loading} />
    </div>
  );
};

export default Loading;
