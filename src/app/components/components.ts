import { ExercisesIndexComponent } from './exercises/exercises-index/exercises-index.component';
import { ProgramComponent } from './program/program.component';
import { ExercisesCreateComponent } from './exercises/exercises-create/exercises-create.component';
import { ExercisesEditComponent } from './exercises/exercises-edit/exercises-edit.component';
import { ManageComponent } from './manage/manage.component';
import { ExerciseTypesIndexComponent } from './exercise-types/exercise-types-index/exercise-types-index.component';
import { ExerciseTypesCreateComponent } from './exercise-types/exercise-types-create/exercise-types-create.component';
import { ExerciseTypesEditComponent } from './exercise-types/exercise-types-edit/exercise-types-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './dialog/dialog.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';

export const components = [
    StartComponent,
    ProgramComponent,
    ManageComponent,
    NotFoundComponent,
    SpinnerComponent,
    UserProfileComponent,
    LoginComponent,
    DialogComponent,
    AddExerciseDialogComponent,
    ExercisesIndexComponent,
    ExercisesCreateComponent,
    ExercisesEditComponent,
    ExerciseTypesIndexComponent,
    ExerciseTypesCreateComponent,
    ExerciseTypesEditComponent
];

export const entryComponents = [
    DialogComponent,
    AddExerciseDialogComponent
];
