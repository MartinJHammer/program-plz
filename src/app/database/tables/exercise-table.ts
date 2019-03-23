import { Exercise } from 'src/app/models/exercise';
import { Table } from '../table';
import { horizontalPushExercises } from '../seeds/horizontal-push';
import { horizontalPullExercises } from '../seeds/horizontal-pull';
import { verticalPullExercises } from '../seeds/vertical-pull';
import { verticalPushExercises } from '../seeds/vertical-push';
import { coreExercises } from '../seeds/core';
import { legExercises } from '../seeds/legs';
import { backlineMobExercises } from '../seeds/backline-mob';
import { frontlineMobExercises } from '../seeds/frontline-mob';
import { midlineMobExercises } from '../seeds/midline-mob';
import { sidelineMobExercises } from '../seeds/sideline-mob';


export class ExerciseTable extends Table<Exercise> {
    constructor() {
        super('exercises');
    }

    public seed() {
        this.addRange([
            ...strengthExercises,
            ...mobExercises
        ]);
    }
}

const strengthExercises = [
    ...horizontalPushExercises,
    ...horizontalPullExercises,
    ...verticalPullExercises,
    ...verticalPushExercises,
    ...coreExercises,
    ...legExercises
];

const mobExercises = [
    ...backlineMobExercises,
    ...frontlineMobExercises,
    ...midlineMobExercises,
    ...sidelineMobExercises
];
