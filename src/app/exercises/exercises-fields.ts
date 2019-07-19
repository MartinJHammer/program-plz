import { FieldTypes } from '../form/models/field-types';
import { Field } from '../form/models/field';
import { Injectable } from '@angular/core';
import { SelectField } from '../form/models/select-field';

@Injectable({ providedIn: 'root' })
export class ExercisesFields {
    public fields: Field[] = [
        { key: 'id', type: FieldTypes.hidden },
        { key: 'name', value: '', placeholder: 'Enter exercise name', type: FieldTypes.string },
        { key: 'exerciseTypeId', collection: 'exercise-types', displayKey: 'name', value: null, type: FieldTypes.selectField } as SelectField
    ];
}

