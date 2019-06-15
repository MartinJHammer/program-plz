import { FieldTypes } from 'src/app/models/field-types';
import { Field } from 'src/app/models/field';
import { Injectable } from '@angular/core';
import { SelectField } from 'src/app/models/select-field';

@Injectable({ providedIn: 'root' })
export class ExerciseTypesFields {
    public fields: Field[] = [
        { key: 'id', type: FieldTypes.hidden },
        { key: 'name', value: '', placeholder: 'Enter exercise type name', type: FieldTypes.string },
        { key: 'attributes', collection: 'attributes', displayKey: 'name', type: FieldTypes.multiSelectField } as SelectField
    ];
}

