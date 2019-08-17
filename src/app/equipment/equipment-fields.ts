import { Field } from '../form/models/field';
import { Injectable } from '@angular/core';
import { HiddenFieldComponent } from '../form/components/hidden-field/hidden-field.component';
import { StringFieldComponent } from '../form/components/string-field/string-field.component';

@Injectable({ providedIn: 'root' })
export class EquipmentFields {
    public fields: Field[] = [
        { key: 'id', component: HiddenFieldComponent },
        { key: 'name', value: '', placeholder: 'Enter equipment name', component: StringFieldComponent },
    ];
}

