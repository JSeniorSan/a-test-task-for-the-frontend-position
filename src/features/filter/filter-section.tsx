import { ChangeEvent, useRef, useState } from 'react';
import { Item } from '../../widgets/home/model/types';
import { items } from '../../widgets/home/model/fetch-data';

export interface FormValues {
  category: string;
  value: string | number;
}

export const FilterSection = ({
  setItemArray,
  newOffset,
  setIsLoading,
}: {
  setItemArray: (value: Item[]) => void;
  newOffset: number;
  setIsLoading: (value: boolean) => void;
}) => {
  const ref = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSelect = () => {
    setCategory(ref.current!.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValue = value;
    console.log(category, value);
    let data = {
      category: ref.current!.value,
      value: inputValue,
    };
    setIsLoading(true);
    items(newOffset, 50, 'filter', data)
      .then((result) => {
        setItemArray(result.result);
      })
      .catch((err) => {
        if (err instanceof Error) {
          return err.message;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form style={{ display: 'flex', gap: '20px' }} onSubmit={handleSubmit}>
      <select ref={ref} onChange={handleSelect} style={{ height: '46px' }}>
        <option value="brand">brand</option>
        <option value="product">product</option>
        <option value="price">price</option>
      </select>
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.currentTarget.value)
        }
        style={{ height: '40px', fontSize: '20px' }}
      />
      <button type="submit">Done</button>
    </form>
  );
};
