import { MotivationService } from "./motivation.service";
import { Motivation } from "./motivation.type";

export class MotivationComponentBase {

    public motivationList: Motivation[] = [];
    public motivation!: Motivation;

    constructor(protected motivationService: MotivationService) {

        this.setMotivationList();
        this.startMotivatioInterval();

    }

    click() {
        this.setMotivation();
    }

    startMotivatioInterval() {
        setInterval(() => {
            if (this.motivationList.length === 0) {
                this.setMotivationList();
            }
            else {
                this.setMotivation();
            }
        }, 60000);
    }

    public setMotivationList() {
        this.motivationService.getMotivationList().subscribe((data) => {
            this.motivationList = data;
            this.setMotivation();
        });
    }

    public setMotivation() {
        if (this.motivationList.length > 0) {
            this.motivation = this.motivationList.pop() as Motivation;
        }
    }

}