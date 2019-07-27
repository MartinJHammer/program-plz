import { ProgramComponent } from './program/program.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';
import { ExerciseTypeSelectComponent } from './exercise-type-select/exercise-type-select.component';
import { ShuffleExercisesComponent } from './shuffle-exercises/shuffle-exercises.component';
import { ExerciseTypeOrderComponent } from './exercise-type-order/exercise-type-order.component';

export const components = [
    ProgramComponent,
    ExerciseComponent,
    AddExerciseDialogComponent,
    ExerciseTypeSelectComponent,
    ExerciseTypeOrderComponent,
    ShuffleExercisesComponent
];

export const entryComponents = [
    AddExerciseDialogComponent
];
