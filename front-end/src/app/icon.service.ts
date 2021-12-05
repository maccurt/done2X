import { Injectable } from '@angular/core';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import {
  faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare,
  faGlassCheers, faBrain, faCircle, faTrash, faWrench
} from '@fortawesome/free-solid-svg-icons';



@Injectable({
  providedIn: 'root'
})
export class IconService {
  //Font Awesome Icons
  //TODO Remove this and use icons class below
  learnIcon = faGraduationCap;
  wartsAndAllIcon = faFrog;
  experimentLearnIcon = faChalkboardTeacher;
  goalsTaskIcon = faCheckSquare;
  celebrateIcon = faGlassCheers;
  priority = [faBrain, faCircle];
  edit = faWrench;
  delete = faTrash;

  icons = {
    learnIcon: faGraduationCap,
    wartsAndAllIcon: faFrog,
    experimentLearnIcon: faChalkboardTeacher,
    goalsTaskIcon: faCheckSquare,
    celebrateIcon: faGlassCheers,
    edit: faWrench,
    delete: faTrash,
    completed: faSmile
  }

  colors = {
    completed_color_1: '#ccffcc',
    completed_color_2: '#e6ffe6',
    not_completed_color_1: '#b3b3ff',
    not_completed_color_2: '#e6e6ff'
  }

  constructor() { }
}
