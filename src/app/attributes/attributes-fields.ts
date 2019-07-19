import { Injectable } from '@angular/core';
import { FieldTypes } from '../form/models/field-types';
import { Field } from '../form/models/field';

@Injectable({ providedIn: 'root' })
export class AttributesFields {
    public fields: Field[] = [
        { key: 'id', type: FieldTypes.hidden },
        { key: 'name', value: '', placeholder: 'Enter attribute name', type: FieldTypes.string }
    ];
}

