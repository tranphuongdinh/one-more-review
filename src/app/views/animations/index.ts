import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate(
    '1.5s ease-in-out',
    style({
      opacity: 1,
    })
  ),
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate(
    '1.5s ease-in-out',
    style({
      opacity: 0,
    })
  ),
]);

export const fadeIn = trigger('fadeIn', [enterTransition]);

export const fadeOut = trigger('fadeOut', [leaveTrans]);
