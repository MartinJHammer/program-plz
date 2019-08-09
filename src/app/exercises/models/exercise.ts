import { Entry } from 'src/app/start/models/entry';

export class Exercise extends Entry {
    // Actually implemented
    public name: string;
    public description: string;
    public equipmentIds: string[];
    public exerciseTypeId: string;

    // Possible props
    // public alternativeNames: string[];
    // public targetMuscles: any[];
    // public order: number;
    // public family: string;
    // public relations: string[];
    // public easierVersions: number[];
    // public harderVersions: number[];
    // public categories: string[];
    // public correctFormGifs: any[];
    // public incorrectFormGifs: any[];
    // public cues: string[];
    // public description: string;
    // public modifications: any[];
    // public setupTime: number;
    // public averageRepTime: number;
    // public qualitiesTrained: any[];

    constructor(values: Partial<Exercise>) {
        super();
        Object.assign(this, values);
    }
}
