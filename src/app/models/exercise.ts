import { Entry } from './entry';

export class Exercise extends Entry {
    public name: string;
    public alternativeNames: string[];
    public targetMuscles: any[];
    public equipment: any[];
    public exerciseTypeId: string;

    /**
     * Order in which the exercise appears in the program
     */
    public order: number;

    /**
     * Handstand
     */
    public family: string;
    /**
     * Push up, Presses, Headstand
     */
    public relations: string[];

    /**
     * Exercise ids
     */
    public easierVersions: number[];
    /**
     * Exercise ids
     */
    public harderVersions: number[];

    /**
     * ???
     */
    public categories: string[];
    // public pictures: any[];
    public correctFormGifs: any[];
    public incorrectFormGifs: any[];
    public cues: string[];
    public description: string;
    /**
     * Equipment, alternation, speed, static|dynamic,
     */
    public modifications: any[];
    public setupTime: number;
    public averageRepTime: number;

    /**
     * Strength, balance, endurance,
     */
    public qualitiesTrained: any[];

    constructor(values: Partial<Exercise>) {
        super(values);
        Object.assign(this, values);
    }
}
