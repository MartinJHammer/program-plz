import { Entry } from 'src/app/start/models/entry';

export class Preferences extends Entry {
    /**
     * What attributes must be true for the exercise type in order for it to be included.
     */
    public exerciseTypeAttributes: string[] = [];

    /**
     * What exercise types should be included in the program.
     * Must be exercise type ids.
     */
    public exerciseTypes: string[] = [];

    /**
     * The sort order of the exercise types.
     * Must be exercise type ids in the correct order.
     */
    public exerciseTypesOrder: string[] = [];

    /**
     * Equipment to be used
     */
    public equipmentIds: string[] = [];


    constructor(values: Partial<Preferences>) {
        super();
        Object.assign(this, values);
    }
}
