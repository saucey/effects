import { combineEpics } from 'redux-observable';

const get = action$ => action$.pipe(

);


export const rootEpic = combineEpics(
    get, 
);