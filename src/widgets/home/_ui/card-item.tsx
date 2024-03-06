import { Item } from '../model/types';
import styles from './style.module.scss';

export const Card = ({ product, id, brand, price }: Item) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{product}</div>
      <div>{brand}</div>
      <div> {'Price' + ' ' + price}</div>
      <p>Identificator:</p>
      <p style={{ fontSize: '10px' }}>{id}</p>
    </div>
  );
};
