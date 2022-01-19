import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Motivation } from './motivation.type';

@Injectable({
  providedIn: 'root'
})
export class MotivationService {

  constructor() { }  

  public getMotivationList(): Observable<Motivation[]> {
    let motivationList: Motivation[] = [];
    motivationList.push(new Motivation('Success is the progressive realization of a worthy goal or ideal.', 'Earl Nightingale'));
    motivationList.push(new Motivation('Do or do not! There is no try.', 'Master Yoda'));
    motivationList.push(new Motivation('Success is the ability to go from one failure to another with no loss of enthusiasm', 'Winston Churchill'));
    motivationList.push(new Motivation('Success is almost totally dependent upon drive and persistence. The extra energy required to make another effort or try another approach is the secret of winning.', 'Denis Waitley'));
    motivationList.push(new Motivation('It always seems impossible until it\'s done.', 'Nelson Mandela'));
    motivationList.push(new Motivation('Everybody needs a passion. That’s what keeps life interesting. If you live without passion, you can go through life without leaving any footprints.', 'Betty White'));
    motivationList.push(new Motivation('Stay on target. Stay On Target!', '"Pops" David Krail'));
    //Done 2x Quotes
    motivationList.push(new Motivation('Ask yourself: Is what you are doing adding value.', 'Done2X.com'));
    motivationList.push(new Motivation('Consistently working task everyday leads to great gain.', 'Done2X.com'));
    motivationList.push(new Motivation('Focus on what will get you done and functional. Not perfect, you can make it better later.', 'Done2X.com'));
    motivationList = this.shuffle(motivationList);
    return of(motivationList);
  }

  //TODO put the shuffle in a more common spot, math.service?
  public shuffle(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}