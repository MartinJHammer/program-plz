import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';

export const horizontalPushExercises: Exercise[] = [
    new Exercise({
        name: 'Alternate DB press',
        types: [
            ExerciseType.horizontalPush
        ]
    }),
    new Exercise({
        name: 'Handstand',
        types: [
            ExerciseType.horizontalPush
        ]
    }),
    new Exercise({
        name: 'Handstand walkouts',
        types: [
            ExerciseType.horizontalPush
        ]
    }),
    new Exercise({
        name: 'Handstand shoulder touches',
        types: [
            ExerciseType.horizontalPush
        ]
    })
];
