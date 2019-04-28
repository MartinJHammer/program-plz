import { FieldTypes } from './field-types';

export class Field {
    public key: string;
    public value?: any = null;
    public type: FieldTypes;
    public placeholder?: string;
}
