import { Injectable } from '@angular/core';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSmile } from '@fortawesome/free-regular-svg-icons';
import {
  faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare,
  faGlassCheers, faBrain, faCircle, faTrash, faWrench
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  icons = {
    priority: faCircle,
    learnIcon: faGraduationCap,
    wartsAndAllIcon: faFrog,
    experimentLearnIcon: faChalkboardTeacher,
    goalsTaskIcon: faCheckSquare,
    celebrateIcon: faGlassCheers,
    edit: faWrench,
    delete: faTrash,
    completed: faSmile,
    arrowLeft: faArrowAltCircleLeft,
    arrowRight: faArrowAltCircleRight
  }

  colors = {
    completed_color_1: '#ccffcc',
    completed_color_2: '#e6ffe6',
    not_completed_color_1: '#b3b3ff',
    not_completed_color_2: '#e6e6ff'
  }

  constructor() { }
}
