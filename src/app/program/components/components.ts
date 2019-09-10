import { ProgramComponent } from './program/program.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseTypeSelectComponent } from './exercise-type-select/exercise-type-select.component';
import { ShuffleExercisesComponent } from './shuffle-exercises/shuffle-exercises.component';
import { ExerciseTypeOrderComponent } from './exercise-type-order/exercise-type-order.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProgramStepperComponent } from './program-stepper/program-stepper.component';
import { ReplaceExerciseSearchComponent } from './replace-exercise-search/replace-exercise-search.component';
import { PreferencesComponent } from './preferences/preferences.component';

export const components = [
    ProgramComponent,
    ExerciseComponent,
    ExercisesComponent,
    AddExercisesComponent,
    ReplaceExerciseSearchComponent,
    ExerciseTypeSelectComponent,
    ExerciseTypeOrderComponent,
    ShuffleExercisesComponent,
    ProgramStepperComponent,
    PreferencesComponent
];

export const entryComponents = [
    ReplaceExerciseSearchComponent
];
