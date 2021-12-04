import { Injectable } from '@angular/core';
import {
  faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare,
  faGlassCheers, faBrain, faCircle, faTrash, faWrench
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  //Font Awesome Icons
  learnIcon = faGraduationCap;
  wartsAndAllIcon = faFrog;
  experimentLearnIcon = faChalkboardTeacher;
  goalsTaskIcon = faCheckSquare;
  celebrateIcon = faGlassCheers;
  priority = [faBrain, faCircle];
  edit = faWrench;
  delete = faTrash;

  constructor() { }
}
