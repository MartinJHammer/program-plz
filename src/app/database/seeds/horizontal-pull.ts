import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';

export const horizontalPullExercises: Exercise[] = [
    new Exercise({
        name: 'Pull ups',
        types: [
            ExerciseType.horizontalPull
        ]
    }),
    new Exercise({
        name: 'Band pull ups',
        types: [
            ExerciseType.horizontalPull
        ]
    }),
    new Exercise({
        name: 'Pull downs',
        types: [
            ExerciseType.horizontalPull
        ]
    }),
    new Exercise({
        name: 'Uneven pull downs',
        types: [
            ExerciseType.horizontalPull
        ]
    }),
    new Exercise({
        name: 'Straight arm pull downs',
        types: [
            ExerciseType.horizontalPull
        ]
    })
];
