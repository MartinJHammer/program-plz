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
import { AttributesIndexComponent } from './attributes/attributes-index/attributes-index.component';
import { AttributesCreateComponent } from './attributes/attributes-create/attributes-create.component';
import { AttributesEditComponent } from './attributes/attributes-edit/attributes-edit.component';
import { DialogComponent } from './dialog/dialog.component';

export const components = [
    StartComponent,
    ProgramComponent,
    ManageComponent,
    NotFoundComponent,
    SpinnerComponent,
    UserProfileComponent,
    LoginComponent,
    DialogComponent,
    ExercisesIndexComponent,
    ExercisesCreateComponent,
    ExercisesEditComponent,
    ExerciseTypesIndexComponent,
    ExerciseTypesCreateComponent,
    ExerciseTypesEditComponent,
    AttributesIndexComponent,
    AttributesCreateComponent,
    AttributesEditComponent
];

export const entryComponents = [
    DialogComponent
];
