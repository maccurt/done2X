export enum Priority {
  unknown = 0,
  high = 1,
  medium = 2,
  low = 3
}
export class PriorityData {

  onePriorityText?: string;
  onePriority?:Priority = Priority.low; 
  isOnePriority?:boolean = false;
  constructor(public low: number, public medium: number, public high: number) {

    if (this.low === this.count()) {
      this.onePriorityText = "All Task Are Low Priority";
      this.onePriority = Priority.low;
      this.isOnePriority = true;     
    }

    if (this.medium === this.count()) {
      this.onePriorityText = "All Task Are Medium Priority";
      this.onePriority = Priority.medium;
      this.isOnePriority = true;     
    }

    if (this.high === this.count()) {
      this.onePriority = Priority.high;
      this.onePriorityText = "All Task Are High Priority";
      this.isOnePriority = true;     
    }

   }
  public count(): number {
    return this.low + this.medium + this.high;
  }  
}
