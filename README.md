# Plant

致力于解决前端增删改查的问题

## Install

```bash
# or yarn 
$ npm install plant
```

## Usage

直接使用

```js
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
  return <div className={styles.normal}>Hello Plant!</div>;
};

```

跨组件使用(不作为plant的一个主要功能，但是封装了简单的context，作为一种思路)

```js
import React from 'react';
import styles from './index.css';
import { createPlant, usePlantContext, Plant } from 'plant';

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

```

## Options

TODO

## LICENSE

MIT
