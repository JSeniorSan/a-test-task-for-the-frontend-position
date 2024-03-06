import CryptoJS from 'crypto-js';
import { FormValues } from '../../../features/filter/filter-section';
import { filteringFn } from './filter-clone';
const URL_API = 'https://api.valantis.store:41000/';
const password = 'Valantis';

const dateArr = new Date().toISOString().toString().split('-');
const dayStr = dateArr[2].slice(0, 2);

const date = [dateArr[0], dateArr[1], dayStr].join('');

export const getData = async (
  offset: number,
  limit: number,
  type: 'filter' | 'items',
  category?: string,
  value?: string | number
) => {
  if (type === 'filter' && category) {
    const configData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': CryptoJS.MD5(`${password}_${date}`).toString(),
      },
      body: JSON.stringify({
        action: 'filter',
        params: {
          [category]: value,
        },
      }),
    };

    try {
      const response = await fetch(URL_API, configData);
      const data = await response.json();
      const result = filteringFn(data.result);

      return result;
    } catch (err) {
      console.log(err);
      console.log('Ошибка');
    }
  } else {
    const configData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': CryptoJS.MD5(`${password}_${date}`).toString(),
      },
      body: JSON.stringify({
        action: 'get_ids',
        params: {
          offset: offset,
          limit: limit,
        },
      }),
    };
    try {
      const response = await fetch(URL_API, configData);
      const data = await response.json();
      const result = filteringFn(data.result);
      return result;
    } catch (err) {
      console.log(err);
      console.log('Ошибка');
    }
  }
};

export const getItems = async (ids: string[]) => {
  const configItems = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': CryptoJS.MD5(`${password}_${date}`).toString(),
    },
    body: JSON.stringify({
      action: 'get_items',
      params: {
        ids: ids,
      },
    }),
  };

  try {
    const response = await fetch(URL_API, configItems);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    console.log('Ошибка');
  }
};

export const items = async (
  offset: number,
  limit: number,
  type: 'filter' | 'items',
  obj?: FormValues
) => {
  const val = obj?.category === 'price' ? Number(obj?.value) : obj?.value;
  const data = await getData(offset, limit, type, obj?.category, val);
  const items = await getItems(data!);
  return items;
};
