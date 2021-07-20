import { useMachine } from '@xstate/react';

import { dataMachine } from './props';

export const DataFetching = () => {
  const [current, send] = useMachine(dataMachine);
  const { data } = current.context;
  
  return (
    <div>
      <h3>Data Fetching</h3>

      <ul>
        {data.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>

      {current.matches('loading') &&  <span>Loading...</span>}

      {current.matches('more') && (
        <p>
          <button onClick={() => send('LOAD')}>Load more</button>
        </p>
      )}
    </div>
  );
}