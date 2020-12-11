import React from 'react';
import styles from './index.css';
import { createPlant, usePlantContext, Plant } from '@sensoro/plant';

const plant = createPlant();

const model = {
  fetch: () =>
    Promise.resolve({
      code: 0,
      data: {
        list: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        total: 4,
      },
    }),
};

const Demo: React.FC = () => {
  const { allIds, byId, fetch, loading } = usePlantContext(plant);
  React.useEffect(() => {
    fetch();
  }, []);
  console.log('allIds = ', allIds, byId);
  return <div>demo</div>;
};

export default () => {
  return (
    <Plant model={model} plant={plant}>
      <div className={styles.normal}>
        <Demo />
      </div>
    </Plant>
  );
};
