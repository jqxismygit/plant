import React from 'react';
import styles from './index.css';
import { usePlant } from 'plant';

const model = {
  fetch: () =>
    Promise.resolve({
      code: 0,
      data: {
        list: [{ id: 1 }, { id: 2 }, { id: 3 }],
        total: 3,
      },
    }),
};

export default () => {
  const { allIds, fetch } = usePlant(model);
  React.useEffect(() => {
    fetch();
  }, []);
  console.log('allIds = ', allIds);
  return <div className={styles.normal}>Hello Umi!</div>;
};
