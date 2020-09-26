export class ItemModel{
    id: string;
    name: string;
    description: string;
    active: boolean;

    constructor() {
        this.active=true;
    }
}