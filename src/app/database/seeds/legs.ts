import { Exercise } from 'src/app/models/exercise';
import { ExerciseType } from 'src/app/models/exercise-type';

export const legExercises: Exercise[] = [
    new Exercise({
        name: 'High bar squats',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Low bar squats',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Front squats',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Pistols',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Lunges',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: '3D lunges',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Quad curls',
        types: [
            ExerciseType.squat
        ]
    }),
    new Exercise({
        name: 'Nordic curls',
        types: [
            ExerciseType.lift
        ]
    }),
    new Exercise({
        name: 'Ball bridge roll-outs',
        types: [
            ExerciseType.lift,
            ExerciseType.lunge,
        ]
    }),
    new Exercise({
        name: 'Deadlifts',
        types: [
            ExerciseType.lift
        ]
    }),
    new Exercise({
        name: 'Single leg deadlifts',
        types: [
            ExerciseType.lift
        ]
    })
];
