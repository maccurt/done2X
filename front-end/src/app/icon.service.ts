import { Injectable } from '@angular/core';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSmile } from '@fortawesome/free-regular-svg-icons';
import {
  faGraduationCap, faFrog, faChalkboardTeacher, faCheckSquare,
  faGlassCheers, faBrain, faCircle, faTrash, faWrench, faArrowAltCircleDown, faArrowAltCircleUp, faArrowDown, faArrowUp, faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconColorService {
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
    arrowRight: faArrowAltCircleRight,
    arrowUp: faArrowUp,
    arrowDown: faArrowDown,
    ellipisHorz:faEllipsisH
    //arrowDown: faArrowAltCircleDown,
  }

  colors = {
    completed_color_1: '#ccffcc',
    completed_color_2: '#e6ffe6',
    not_completed_color_1: '#b3b3ff',
    not_completed_color_2: '#e6e6ff',
    priority: {
      low: '#ffff4d',
      medium: '#4dff4d',
      high: '#ff4d4d',
    }
  }

  constructor() { }
}
