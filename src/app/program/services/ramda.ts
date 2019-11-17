import {
    filter,
    pipe,
    reject,
    find,
    complement,
    reduce,
    either,
    both,
    map,
    prop,
    sort,
    ascend,
    length,
    mean,
    sortBy
} from 'ramda';

// Numbers
export const highestFirst = sort((a, b) => b - a);
export const lowestFirst = sort((a, b) => a - b);
export const average = x => mean(x);

// Volume prop
export const volumeProp = prop('volume');
export const volumeProps = map(volumeProp);
export const highestVolumeFirst = pipe(
    volumeProps,
    highestFirst
);
export const lowestVolumeFirst = pipe(
    volumeProps,
    lowestFirst
);
export const averageVolume = pipe(
    volumeProps,
    average
);









