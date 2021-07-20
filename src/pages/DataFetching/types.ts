export type Data = {
  id: number; 
  description: string;
}

export type Context = {
  data: Data[];
}

export type Event = 
  | { type: 'LOAD' }
  | { type: 'DONE_MORE', newData: Data[] }
  | { type: 'DONE_COMPLETE', newData: Data[] }
  | { type: 'FAIL' };