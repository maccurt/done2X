import { IDescriber } from "../abstract types/describer.interface";

export class Experiment implements IDescriber {
    constructor() {  }
    id!: number;
    name!: string;
    version!: number;
    text?: string;
}