import { Injectable } from '@angular/core';
import { highestFirst, average, lowestFirst, highestVolumeFirst, lowestVolumeFirst, averageVolume, totalVolume } from './ramda';

class UserExercise {
    volume: number;

    constructor(values: Partial<UserExercise>) {
        Object.assign(this, values);
    }
}

enum VolumeUnit {
    pounds,
    kg,
    seconds,
    count,
}


@Injectable({ providedIn: 'root' })
export class RamdaService {


    public numbers = [1, 9, 5, 7, 3, 2, 0, 7, 53, 7];

    public userExercicses = [
        new UserExercise({
            volume: 10
        }),
        new UserExercise({
            volume: 4
        }),
        new UserExercise({
            volume: 16
        }),
        new UserExercise({
            volume: 3
        }),
        new UserExercise({
            volume: 12
        }),
        new UserExercise({
            volume: 11
        }),
        new UserExercise({
            volume: 6
        }),
        new UserExercise({
            volume: 17
        })
    ];

    constructor() { this.init(); }

    public init(): void {
        const result = {} as any;
        result.highestVolumeFirst = highestVolumeFirst(this.userExercicses);
        result.lowestVolumeFirst = lowestVolumeFirst(this.userExercicses);
        result.averageVolume = averageVolume(this.userExercicses);
        result.totalVolume = totalVolume(this.userExercicses);
        console.log(JSON.stringify(result, undefined, 2));
    }
}
