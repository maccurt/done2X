import { IDescriber } from "./IDescriber";

export class Experiment implements IDescriber {
    
    constructor(public text: string) {

    }
}