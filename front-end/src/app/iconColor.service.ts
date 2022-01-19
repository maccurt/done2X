import { Injectable } from '@angular/core';
import { faCheckSquare, faTrashAlt, faArrowAltCircleLeft, faArrowAltCircleRight, faPlusSquare, faSmile, IconDefinition, faCalendarCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faGraduationCap, faFrog, faChalkboardTeacher, 
  faGlassCheers, faCircle, faArrowDown, faArrowUp, faEllipsisH, faTasks, faPencilAlt, faBug, faMoneyBill, faSearchDollar, faVial, faCheck, faExpandArrowsAlt
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconColorService {
  icons = {
    moveTaskToCompleted:faArrowDown,
    notCompletedTask:faArrowUp,
    priority: faCircle,
    learnIcon: faGraduationCap,
    wartsAndAllIcon: faFrog,
    experimentLearnIcon: faChalkboardTeacher,
    goalsTaskIcon: faCheckSquare,
    celebrateIcon: faGlassCheers,
    edit: faPencilAlt,
    delete: faTrashAlt,
    completed: faSmile,
    arrowLeft: faArrowAltCircleLeft,
    arrowRight: faArrowAltCircleRight,
    arrowUp: faArrowUp,
    arrowDown: faArrowDown,
    ellipisHorz: faEllipsisH,
    tasks: faTasks,
    addTask: faPlusSquare,
    defect: faBug,
    feature: faCalendarCheck,
    techDebt:faSearchDollar,
    test:faVial,
    moveTaskToGoal:faExpandArrowsAlt
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
