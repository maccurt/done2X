import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Motivation {
  constructor(public qoute: string, public author: string) {
  }
}


@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.scss']
})
export class MotivationComponent implements OnInit {

  public motivationList: Motivation[] = [];
  public motivation!: Motivation;
  constructor() { }

  ngOnInit(): void {

    const setMotivation = () => {
      if (this.motivationList.length > 0) {
        this.motivation = this.motivationList.pop() as Motivation
      }
    }

    this.getMotivationList().subscribe((data) => {
      this.motivationList = data;
      setMotivation();
    });

    setInterval(() => {

      if (this.motivationList.length === 0) {
        this.getMotivationList().subscribe((data) => {
          this.motivationList = data;
          setMotivation();
        });
      }
      else {
        setMotivation();
      }
    }, 60000);
  }

  //TODO put the shuffle in a more common spot
  public shuffle(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  public getMotivationList(): Observable<Motivation[]> {
    let motivationList: Motivation[] = [];
    motivationList.push(new Motivation('Success is the progressive realization of a worthy goal or ideal.', 'Earl Nightingale'));
    motivationList.push(new Motivation('Do or do not! There is no try.', 'Master Yoda'));
    motivationList.push(new Motivation('Ask yourself: Is what you are doing adding value.', 'M McGee'));
    motivationList.push(new Motivation('Consistently working task everyday leads to great gain.', 'M McGee'));
    motivationList.push(new Motivation('Success is the ability to go from one failure to another with no loss of enthusiasm', 'Winston Churchill'));
    motivationList.push(new Motivation('Success is almost totally dependent upon drive and persistence. The extra energy required to make another effort or try another approach is the secret of winning.', 'Denis Waitley'));
    motivationList = this.shuffle(motivationList);
    return of(motivationList);
  }
}
