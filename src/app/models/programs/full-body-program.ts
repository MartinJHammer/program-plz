import { Program } from '../program';
import { Database } from 'src/app/database/database';
import { ExerciseType } from '../exercise-type';

export class FullBodyProgram extends Program {

    public createProgram(db: Database) {
        const hPull = db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.horizontalPull));
        const hPush = db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.horizontalPush));
        const vPull = db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.verticalPull));
        const vPush = db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.verticalPush));
        const legs = db.exercises.getAll().filter(exercise => [ExerciseType.lift, ExerciseType.lunge, ExerciseType.squat].some(condition => exercise.types.includes(condition)));
        const core = db.exercises.getAll().filter(exercise => exercise.types.includes(ExerciseType.core));

        this.exercises = this.exercises.concat([
            ...shuffle(hPull).slice(0, 1),
            ...shuffle(hPush).slice(0, 1),
            ...shuffle(vPull).slice(0, 1),
            ...shuffle(vPush).slice(0, 1),
            ...shuffle(legs).slice(0, 2),
            ...shuffle(core).slice(0, 2)
        ]);
    }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// TODO: Replace with _.sample()
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}