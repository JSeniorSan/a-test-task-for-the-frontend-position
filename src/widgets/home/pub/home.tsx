import { FilterSection } from '../../../features/filter/filter-section';
import { Pagination } from '../../../features/pagination/pagination';
import { Header } from '../_ui/header';
import { Wrapper } from '../_ui/wrapper';

import { items } from '../model/fetch-data';
import { Item } from '../model/types';
import { CardList } from './card-list';
import styles from './style.module.scss';
import { useCallback, useEffect, useState } from 'react';

export const Home = () => {
  const [itemArray, setItemArray] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [err, setArr] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setItemArray([]);
    setArr('');

    items(currentPage, 50, 'items')
      .then((result) => {
        setItemArray(result.result);
      })
      .catch((err) => {
        setArr(err instanceof Error ? err.message : 'Unknown API Error ');
        setItemArray([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  const onNextPageClick = useCallback(() => {
    const page = currentPage;
    const next = currentPage + 1;
    const value = next <= 20 ? next : page;
    setCurrentPage(value);
  }, [currentPage]);

  const onPrevPageClick = useCallback(() => {
    const page = currentPage;
    const prev = currentPage - 1;
    const value = prev >= 1 ? prev : page;
    setCurrentPage(value);
  }, [currentPage]);

  console.log(itemArray);

  return (
    <div className={styles.home}>
      <Header />
      {isLoading && <p>Loading...</p>}
      {err !== '' && itemArray.length === 0 && err}
      {!isLoading && (
        <Wrapper>
          <FilterSection setItemArray={setItemArray} newOffset={currentPage} setIsLoading={setIsLoading}/>
          <CardList items={itemArray} />
          <Pagination
            setNewOffset={setCurrentPage}
            disable={{ left: currentPage === 1, right: currentPage === 20 }}
            onNextPageClick={onNextPageClick}
            onPrevPageClick={onPrevPageClick}
            nav={{ current: currentPage, total: 20 }}
          />
        </Wrapper>
      )}
    </div>
  );
};
