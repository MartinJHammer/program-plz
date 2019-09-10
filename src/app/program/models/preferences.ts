import { Entry } from 'src/app/start/models/entry';

export class Preferences extends Entry {
    /**
     * Equipment to be used
     * Must be ids.
     */
    public equipment: string[] = [];

    /**
     * What exercise types should be included in the program.
     * Must be ids.
     */
    public exerciseTypes: string[] = [];

    /**
     * The sort order of the exercise types.
     * Must be exercise type ids in the correct order.
     */
    public exerciseTypesOrder: string[] = [];

    /**
     * What attributes must be true for the exercise type in order for it to be included.
     * Must be ids.
     */
    public exerciseTypeAttributes: string[] = [];

    constructor(values: Partial<Preferences>) {
        super();
        Object.assign(this, values);
    }
}
