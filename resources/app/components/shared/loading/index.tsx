import loadingGif from '@/assets/images/bee-loading.gif';
import styles from './loading.module.scss';
type LoadingProps = {
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: number;
};

export const Loading = ({ style = {}, textStyle = {}, size = 50 }: LoadingProps) => {
  return (
    <div className={`${styles.loadingWrap}`} style={{ ...style }}>
      <img
        className={styles.loadingImage}
        src={loadingGif}
        alt="loader"
        style={{ height: size, width: size, maxWidth: '100%' }}
      />
      <h3 style={{ ...textStyle }}>Chờ xíu nhoa...</h3>
    </div>
  );
};
