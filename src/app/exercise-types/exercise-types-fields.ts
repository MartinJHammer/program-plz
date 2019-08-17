import { Field } from '../form/models/field';
import { Injectable } from '@angular/core';
import { SelectField } from '../form/models/select-field';
import { HiddenFieldComponent } from '../form/components/hidden-field/hidden-field.component';
import { StringFieldComponent } from '../form/components/string-field/string-field.component';
import { MultiSelectFieldComponent } from '../form/components/multi-select-field/multi-select-field.component';

@Injectable({ providedIn: 'root' })
export class ExerciseTypesFields {
    public fields: Field[] = [
        { key: 'id', component: HiddenFieldComponent },
        { key: 'name', value: '', placeholder: 'Enter exercise type name', component: StringFieldComponent },
        { key: 'attributes', collection: 'attributes', displayKey: 'name', component: MultiSelectFieldComponent } as SelectField
    ];
}

