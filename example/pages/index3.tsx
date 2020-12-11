import React from 'react';
import styles from './index.css';
import { usePlant } from 'plant';

const model = {
  fetch: () =>
    Promise.resolve({
      code: 0,
      data: {
        list: [
          { id: '1' },
          { id: '2' },
          { id: '11', parentIds: ['1'] },
          { id: '12', parentIds: ['1'] },
          { id: '111', parentIds: ['11', '1'] },
        ],
        total: 4,
      },
    }),
};

export default () => {
  const { allIds, fetch } = usePlant(model, { type: 'tree' });
  React.useEffect(() => {
    fetch();
  }, []);
  console.log('allIds = ', allIds);
  return <div className={styles.normal}>Hello plant tree!</div>;
};
