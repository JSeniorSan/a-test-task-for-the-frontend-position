import { PaginationProps } from './model/types';
import styles from './style.module.scss';

export const Pagination = (props: PaginationProps) => {
  const { disable, onNextPageClick, onPrevPageClick, nav, setNewOffset } =
    props;

  const paginationArray = Array(nav?.total).fill(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.innerText);
    setNewOffset(Number(e.currentTarget.innerText));
  };

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={styles.pagination}>
      <button disabled={disable.left} onClick={handlePrevPageClick}>
        Назад
      </button>
      {paginationArray.map((_, i) => {
        return (
          <button
            key={i}
            onClick={handleClick}
            className={nav?.current === i + 1 ? 'button-active' : ''}
          >
            {`${i + 1}`}
          </button>
        );
      })}
      <button disabled={disable.right} onClick={handleNextPageClick}>
        Вперед
      </button>
    </div>
  );
};
