import { Card } from '../_ui/card-item';
import { Item } from '../model/types';
import styles from './style.module.scss';

export const CardList = ({ items }: { items: Item[] }) => {
  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        return (
          <Card
            brand={item.brand}
            product={item.product}
            id={item.id}
            price={item.price}
            key={i}
          />
        );
      })}
    </div>
  );
};
