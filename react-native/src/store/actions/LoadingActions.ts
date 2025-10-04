import { createAction } from '@reduxjs/toolkit';
import { LoadingActionPayload } from '../../types';

const start = createAction<LoadingActionPayload>('loading/start');

const stop = createAction<Pick<LoadingActionPayload, 'key'>>('loading/stop');

const clear = createAction('loading/clear');

export default {
  start,
  stop,
  clear,
};

export type LoadingActions = 
  | ReturnType<typeof start>
  | ReturnType<typeof stop>
  | ReturnType<typeof clear>;
