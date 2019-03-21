import { Exercise } from 'src/app/models/exercise';
import { Table } from '../table';
import { ExerciseType } from 'src/app/models/exercise-type';


export class ExerciseTable extends Table<Exercise> {
    constructor() {
        super('exercises');
    }

    public seed() {
        this.addRange([
            ...strengthExercises,
            ...stretchExercises
        ]);
    }
}

const strengthExercises = [
    // Vertical push
    new Exercise({
        name: '3D dips',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'Bar Dips',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'Push ups',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'Tiger push ups',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'DB bench press',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'Band pushes',
        types: [
            ExerciseType.verticalPush
        ]
    }),
    new Exercise({
        name: 'Tricep kickbacks',
        types: [
            ExerciseType.verticalPush
        ]
    }),

    // Horizontal push
    new Exercise({
        name: 'External band rotation'
    }),
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
    }),

    // Vertical Pull
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
        name: 'Inlcline curls',
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
        name: 'Band high pulls',
        types: [
            ExerciseType.verticalPull
        ]
    }),

    // Horizontal Pull
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
    }),

    // Core
    new Exercise({
        name: 'Ab wheel',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Walk outs',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Heel to heavens',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Stir the pot',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Russian twist',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Scissors',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Leg raises',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Hanging leg raises',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Yoga planche leg-to-x',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Pallof press',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Bridge',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Side plank',
        types: [
            ExerciseType.core
        ]
    }),
    new Exercise({
        name: 'Plank',
        types: [
            ExerciseType.core
        ]
    }),

    // Legs
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
    }),
];

const stretchExercises = [
    // Side line
    new Exercise({
        name: 'Glute stretch'
    }),
    new Exercise({
        name: 'Glute stretch twister'
    }),
    new Exercise({
        name: 'Cow face (Gomukhasana) pose'
    }),

    // Front line
    new Exercise({
        name: 'Standing quad stretch'
    }),

    // Backline
    new Exercise({
        name: 'Toes lifted hamstrings and calves stretch'
    }),
    new Exercise({
        name: 'Standing curl stretch'
    }),

    // Midline
    new Exercise({
        name: 'Frog (Mandukasana) pose'
    })
];