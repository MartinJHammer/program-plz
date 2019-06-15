import { FieldTypes } from 'src/app/models/field-types';
import { Field } from 'src/app/models/field';
import { Injectable } from '@angular/core';
import { SelectField } from 'src/app/models/select-field';

@Injectable({ providedIn: 'root' })
export class ExercisesFields {
    public fields: Field[] = [
        { key: 'id', type: FieldTypes.hidden },
        { key: 'name', value: '', placeholder: 'Enter exercise name', type: FieldTypes.string },
        { key: 'exerciseTypeId', collection: 'exercise-types', displayKey: 'name', value: null, type: FieldTypes.selectField } as SelectField
    ];
}

