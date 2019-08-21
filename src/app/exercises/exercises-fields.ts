import { Field } from '../form/models/field';
import { Injectable } from '@angular/core';
import { SelectField } from '../form/models/select-field';
import { HiddenFieldComponent } from '../form/components/hidden-field/hidden-field.component';
import { StringFieldComponent } from '../form/components/string-field/string-field.component';
import { EditorFieldComponent } from '../form/components/editor-field/editor-field.component';
import { SelectFieldComponent } from '../form/components/select-field/select-field.component';
import { MultiSelectFieldComponent } from '../form/components/multi-select-field/multi-select-field.component';
import { ExerciseTypesService } from '../exercise-types/services/exercise-types.service';
import { ExerciseType } from '../exercise-types/models/exercise-type';
import { Equipment } from '../equipment/models/equipment';
import { EquipmentService } from '../equipment/services/equipment.service';

@Injectable({ providedIn: 'root' })
export class ExercisesFields {
    public fields: Field[] = [
        { key: 'id', component: HiddenFieldComponent },
        {
            key: 'name',
            value: '',
            placeholder: 'Enter exercise name',
            component: StringFieldComponent
        },
        {
            key: 'description',
            value: '',
            placeholder: 'Enter description',
            component: EditorFieldComponent
        },
        new SelectField({
            key: 'exerciseTypeId',
            placeholder: 'Exercise types',
            collection: 'exercise-types',
            displayKey: 'name',
            value: null,
            component: SelectFieldComponent,
            service: this.exerciseTypesService
        }),
        new SelectField<Equipment>({
            key: 'equipmentIds',
            placeholder: 'Equipment',
            collection: 'equipment',
            displayKey: 'name',
            value: null,
            component: MultiSelectFieldComponent,
            service: this.equipmentService
        })
    ];

    constructor(
        private exerciseTypesService: ExerciseTypesService,
        private equipmentService: EquipmentService
    ) { }
}

