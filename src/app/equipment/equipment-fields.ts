import { FieldTypes } from '../form/models/field-types';
import { Field } from '../form/models/field';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EquipmentFields {
    public fields: Field[] = [
        { key: 'id', type: FieldTypes.hidden },
        { key: 'name', value: '', placeholder: 'Enter equipment name', type: FieldTypes.string },
    ];
}

