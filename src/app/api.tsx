// fetches initial results
import { rooms } from './rooms';

export function fetch(ms: number = 100, page = 1) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(rooms[page]), ms);
  });
}

// fetches more items
export function loadMore(ms: number = 100) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('loadMore'), ms);
  });
}
