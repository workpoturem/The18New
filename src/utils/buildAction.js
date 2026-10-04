import {partial} from 'ramda';

const getData = (type, payload, meta) => ({
  type,
  payload,
  meta,
})

export const buildAction = (type) => partial(getData, [type]);
