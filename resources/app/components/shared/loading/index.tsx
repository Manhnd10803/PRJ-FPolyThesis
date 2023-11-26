import loadingGif from '@/assets/images/bee-loading.gif';
import styles from './loading.module.scss';
type LoadingProps = {
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: number;
  textLoading?: string;
};

export const Loading = ({ style = {}, textStyle = {}, size = 50, textLoading = 'Chờ xíu nhoa...' }: LoadingProps) => {
  return (
    <div className={`${styles.loadingWrap}`} style={{ ...style }}>
      <img
        className={styles.loadingImage}
        src={loadingGif}
        alt="loader"
        style={{ height: size, width: size, maxWidth: '100%' }}
      />
      <h3 style={{ ...textStyle }}>{textLoading}</h3>
    </div>
  );
};
