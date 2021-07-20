import { createMachine, assign } from 'xstate';

import { Context, Event } from './types';

export const allData = [
  {
    id: 1,
    description: 'Teste 1',
  },
  {
    id: 2,
    description: 'Teste 2',
  },
  {
    id: 3,
    description: 'Teste 3',
  },
  {
    id: 4,
    description: 'Teste 4',
  },
  {
    id: 5,
    description: 'Teste 5',
  },
  {
    id: 6,
    description: 'Teste 6',
  },
  {
    id: 7,
    description: 'Teste 7',
  },
  {
    id: 8,
    description: 'Teste 8',
  },
  {
    id: 9,
    description: 'Teste 9',
  },
  {
    id: 10,
    description: 'Teste 10',
  },
];

export const perPage = 3;

export const dataMachine = createMachine<Context, Event>({
  id: 'dataMachine',
  initial: 'loading',
  context: {
    data: [],
  },
  states: {
    loading: {
      invoke: {
        id: 'dataLoader',
        src: (context, _event) => (callback, _onEvent) => {
          setTimeout(() => {
            const { data } = context;
            const newData = allData.slice(data.length, data.length + perPage);
            const hasMore = newData.length === perPage;

            callback({ type: hasMore ? 'DONE_MORE' : 'DONE_COMPLETE', newData });
          }, 2000)
        },
      },
      on: {
        DONE_MORE: {
          target: 'more',
          actions: assign({
            data: ({ data }, { newData = [] }) => [...data, ...newData],
          }),
        },
        DONE_COMPLETE: {
          target: 'complete',
          actions: assign({
            data: ({ data }, { newData = [] }) => [...data, ...newData],
          }),
        },
        FAIL: 'failure'
      },
    },
    more: {
      on: {
        LOAD: 'loading'
      }
    },
    complete: {
      type: 'final'
    },
    failure: {
      type: 'final'
    },
  },
});