import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';

export const verticalPullExercises: Exercise[] = [
    new Exercise({
        name: 'External band rotation'
    }),
    new Exercise({
        name: 'KB Renegade rows',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'Face pulls',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'Incline curls',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'Bar rows',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'See saw rows',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'Band pulls',
        types: [
            ExerciseType.verticalPull
        ]
    }),
    new Exercise({
        name: 'Vertical pulls',
        types: [
            ExerciseType.verticalPull
        ]
    })
];
