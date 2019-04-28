import { FieldTypes } from './field-types';
import { Entry } from './entry';

export class Field {
    public key: string;
    public value?: any = null;
    public type: FieldTypes;
    public placeholder?: string;
    public entries?: Entry[];
}
