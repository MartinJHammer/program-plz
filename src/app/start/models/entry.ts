export class Entry {
    /**
     * The entry id.
     */
    public id: string;

    /**
     * ID of the user who created the entry.
     */
    public userId: string;

    /**
     * The entry's main user-friendly identifier.
     * Used for titles and lists.
     * Do not use it for descriptions, etc.
     */
    public name: string;

    /**
     * Used when needing to get an random entry in firebase.
     */
    public random: number;
}
