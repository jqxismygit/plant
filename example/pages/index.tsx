import React from 'react';
import styles from './index.css';
import { usePlant } from '@sensoro/plant';

const model = {
  fetch: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 0,
          data: {
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            total: 3,
          },
        });
      }, 2000);
    }),
};

export default () => {
  const { allIds, fetch } = usePlant(model);
  React.useEffect(() => {
    fetch();
    fetch();
    fetch();
  }, []);
  console.log('allIds = ', allIds);
  // console.log('allIds = --->>');
  return <div className={styles.normal}>Hello Umi!</div>;
};
