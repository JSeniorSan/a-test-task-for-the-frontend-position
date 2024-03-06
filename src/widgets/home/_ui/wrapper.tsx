import styles from './style.module.scss';
export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.wrapper}>{children}</section>;
};
