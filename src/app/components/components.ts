import { ProgramComponent } from './program/program.component';
import { ManageComponent } from './manage/manage.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './dialog/dialog.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';

export const components = [
    ProgramComponent,
    ManageComponent,
    SpinnerComponent,
    UserProfileComponent,
    LoginComponent,
    DialogComponent,
    AddExerciseDialogComponent
];

export const entryComponents = [
    DialogComponent,
    AddExerciseDialogComponent
];
